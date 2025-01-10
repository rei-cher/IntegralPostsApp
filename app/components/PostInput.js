import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert } from "react-native";
import { supabase } from "../supabaseClient";

export default function PostInput({onPost, navigation}) {
    const [content, setContent] = useState('');

    const handlePost = async () => {
        const {data: {session}} = await supabase.auth.getSession();
        const user = session?.user; // get the logged user

        if (!user) {
            alert ('You must be logged in to post.');
            return;
        }

        // if content is empty dont post
        if (content){
            // insert a new post
            const {error} = await supabase.from('posts').insert({content: content, user_id: user.id});
            console.log(content);
            if (error) {
                alert('Error posting message: ', error.message);
            }
            else {
                console.log('Post added: ', content);
                setContent('');
                onPost(); // trigger post fetch
            }
        }
        else {
            Alert.alert("You can not post empty content");
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
            {/* Input field */}
            <TextInput
                placeholder="Write a post ..."
                className='border border-gray-300 rounded-lg p-3 mb-2 w-full'
                value={content}
                onChangeText={setContent}
            />

            {/* Buttons */}
            <View className="flex-row justify-evenly py-3">
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