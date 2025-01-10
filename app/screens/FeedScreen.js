import React, { useState, useEffect} from "react";
import { View, StyleSheet, FlatList } from "react-native";
import PostInput from "../components/PostInput";
import PostList from "../components/PostList";
import { supabase } from "../supabaseClient";

export default function FeedScreen({navigation}) {
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true); // check if more posts exist
    const [pageSize] = useState(10); // number of posts to fetch at a time

    // TODO: need some more optimization, since the scrolling and loading of posts in not that smooth
    
    useEffect(() => {
        // initial posts
        fetchPosts();

        // real time subscription to listen for new posts
        const post = supabase
            .channel('public:posts') // posts table subscription
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, async (payload) => {
                // fetch a new post with its username
                const { data, error } = await supabase
                    .from('posts')
                    .select('id, content, created_at, user_id, profiles(username)')
                    .eq('id', payload.new.id)
                    .single();

                if (!error && data) {
                    setPosts((prev) => [data, ...prev]); // add the new post with `username` to the list
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(post); // cleanup on component unmount
        };
    }, []);

    const fetchPosts = async () => {
        if (!hasMore) return;

        const { data, error } = await supabase
            .from('posts')
            .select('id, content, created_at, user_id ,profiles(username)')
            .order('created_at', { ascending: false })
            .limit(pageSize);

        if (error) {
            console.error("Error fetching posts:", error);
        } else {
            setPosts((prev) => {
                // filtering out duplicates
                const uniquePosts = data.filter(
                    (newPost) => !prev.some((post) => post.id === newPost.id)
                );
                return [...uniquePosts, ...prev];
            });
        }
    };

    const fetchMore = async () => {
        if (!hasMore) return;

        const {data, error} = await supabase
            .from('posts')
            .select('id, content, created_at, user_id ,profiles(username)')
            .order('created_at', { ascending: false })
            .range(posts.length, posts.length + pageSize - 1); // fetch the next set of posts

        if (error) {
            console.error("Error fetching posts:", error);
        } else {
            if (data.length > 0) {
                setPosts((prev) => [...prev, ...data]); // append new posts to the list
            } else {
                setHasMore(false);
            }
            
        }
    }

    return (
        <View className='flex-1 bg-gray-100 pt-10'>

            {/* Post list */}
            <FlatList
                className='border border-gray-300 rounded py-3'
                data={posts}
                renderItem={({item}) => <PostList post={item} navigation={navigation}/>}
                keyExtractor={(item) => item.id.toString()}
                onEndReached={fetchMore}
                onEndReachedThreshold={0.5}
                scrollEnabled={true}
                ListFooterComponent={<View style={{ height: 150 }} />}
            />

            {/* Post input */}
            <PostInput onPost={fetchPosts} navigation={navigation}/>    
        </View>
    )
}