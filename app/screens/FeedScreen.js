import React, { useState, useEffect} from "react";
import { View, StyleSheet, FlatList } from "react-native";
import PostInput from "../components/PostInput";
import PostList from "../components/PostList";
import { supabase } from "../supabaseClient";

export default function FeedScreen() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
        const post = supabase
            .channel('public:posts')
            .on('postgres_changes', {event: '*', schema: 'public', table: 'posts'}, (payload) => {
                setPosts((prev) => [payload.new, ...prev]);
            })
            .subscribe();

            return () => {
                supabase.removeChannel(post);
            }
    }, []);

    const fetchPosts = async () => {
        const {data, error} = await supabase.from('posts').select('*').order('created_at', {ascending: false});
        if (!error) setPosts(data);
    };

    return (
        <View className='flex-1 bg-gray-100'>

            <FlatList
                className='border border-gray-300 rounded py-3'
                data={posts}
                renderItem={({item}) => <PostList post={item}/>}
                keyExtractor={(item) => item.id.toString()}
            />

            <PostInput onPost={fetchPosts}/>    
        </View>
    )
}