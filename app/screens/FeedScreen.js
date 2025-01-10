import React, { useState, useEffect} from "react";
import { View, StyleSheet, FlatList } from "react-native";
import PostInput from "../components/PostInput";
import PostList from "../components/PostList";
import { supabase } from "../supabaseClient";

export default function FeedScreen({navigation}) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // initial posts
        fetchPosts();

        const post = supabase
            .channel('public:posts') // real time updates for posts
            .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, (payload) => {
                fetchPosts(); // refetch posts to get updated data with usernames
            })
            .subscribe();

        return () => {
            supabase.removeChannel(post); // cleanup on component unmount
        };
    }, []);

    const fetchPosts = async () => {
        const { data, error } = await supabase
            .from('posts')
            .select('id, content, created_at, user_id ,profiles(username)')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching posts:", error);
        } else {
            setPosts(data);
        }
    };

    return (
        <View className='flex-1 bg-gray-100 pt-10'>

            {/* Post list */}
            <FlatList
                className='border border-gray-300 rounded py-3'
                data={posts}
                renderItem={({item}) => <PostList post={item} navigation={navigation}/>}
                keyExtractor={(item) => item.id.toString()}
            />

            {/* Post input */}
            <PostInput onPost={fetchPosts} navigation={navigation}/>    
        </View>
    )
}