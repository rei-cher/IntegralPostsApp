import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { supabase } from "../supabaseClient";

export default function PostInput({onPost, navigation}) {
    const [content, setContent] = useState('');

    const handlePost = async () => {
        const {data: {session}} = await supabase.auth.getSession();
        const user = session?.user;
        if (!user) {
            alert ('You must be logged in to post.');
            return;
        }

        const {error} = await supabase.from('posts').insert({content: content, user_id: user.id});
        console.log(content);
        if (error) {
            alert('Error posting message: ', error.message);
        }
        else {
            console.log('Post added: ', content);
            setContent('');
            onPost();
        }
    };

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            alert('Error logging out: ', error.message);
        } else {
            console.log('Logged out successfully');
            navigation.navigate('Auth');
        }
    };

    return (
        <View className='absolute bottom-0 w-full bg-white px-4 py-2 border-t border-gray-200'>
            <TextInput
                placeholder="Write a post ..."
                className='border border-gray-300 rounded-lg p-3 mb-2 w-full'
                value={content}
                onChangeText={setContent}
            />

            {/* Container for buttons */}
            <View className="flex-row justify-evenly">
                <TouchableOpacity
                    onPress={handlePost}
                    className="bg-blue-400 rounded-full p-3 w-32 h-12 flex justify-center items-center"
                >
                    <Text className="text-lg font-semibold text-white text-center">Post</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleLogout}
                    className="bg-red-400 rounded-full p-3 w-32 h-12 flex justify-center items-center"
                >
                    <Text className="text-lg font-semibold text-white text-center">Exit</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    );
}