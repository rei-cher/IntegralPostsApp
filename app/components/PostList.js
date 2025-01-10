import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PostList({post}) {
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
                <Text className="text-xs text-blue-500 font-semibold">
                    User ID: {post.user_id}
                </Text>
            </View>
        </View>
    )
}