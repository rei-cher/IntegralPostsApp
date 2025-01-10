import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function PostList({post, navigation}) {

    console.log(post);

    const handleUsernameClick = () => {
        if (post.user_id) {
            navigation.navigate('Profile', {userId: post.user_id});
        } else {
            console.error("Error: user_id is undefined.");
        }
    };

    return (
        <View className="bg-white rounded-lg shadow-md p-4 my-2 mx-4 border border-gray-200">
        
            {/* Post content */}
            <Text className="text-lg font-medium text-gray-800 mb-2">
                {post.content}
            </Text>

            {/* Post Meta */}
            <View className="flex-row justify-between items-center">
                <Text className="text-sm text-gray-500">
                    {new Date(post.created_at).toLocaleString()}
                </Text>
                <View className="flex-row items-center">
                    <Text className="text-xs text-black font-semibold">
                        User: 
                    </Text>
                    <TouchableOpacity onPress={handleUsernameClick}>
                        <Text className="text-xs text-blue-400 px-1">
                            {post.profiles?.username || "Unknown User"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}