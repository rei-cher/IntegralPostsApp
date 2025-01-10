import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { supabase } from "../supabaseClient";

export default function UserScreen({route, navigation}) {
    console.log(route);
    const { userId } = route.params;
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchUserData();
        fetchUserPosts();
    }, []);

    const fetchUserData = async () => {
        // fetch user details from the profiles table
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            console.error("Error fetching user data:", error);
        } else {
            setUser(data);
        }
    };

    // fetch posts made by the user
    const fetchUserPosts = async () => {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching user posts:", error);
        } else {
            setPosts(data);
        }
    };

    return (
        <View className="flex-1 bg-gray-100 px-4 pt-10">
            {user && (
                <View className="bg-white rounded-lg shadow-md p-4 mb-4">
                    <Text className="flex text-4xl font-bold text-center">User Details</Text>

                    <Text className="text-lg text-gray-700">
                        <Text className="font-semibold">Username: </Text>
                        {user.username}
                    </Text>

                    <Text className="text-lg text-gray-700">
                        <Text className="font-semibold">First Name: </Text>
                        {user.firstName}
                    </Text>

                    <Text className="text-lg text-gray-700">
                        <Text className="font-semibold">Last Name: </Text>
                        {user.lastName}
                    </Text>

                    <Text className="text-lg text-gray-700"><Text className="font-semibold">Registered: </Text>{new Date(user.created_at).toLocaleString()}</Text>
                </View>
            )}

            <FlatList
                data={posts}
                renderItem={({ item }) => (
                    <View className="bg-white rounded-lg shadow-md p-4 mb-2">
                        <Text className="text-md">{item.content}</Text>
                        <Text className="text-xs text-gray-500">{new Date(item.created_at).toLocaleString()}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={<Text className="text-center text-gray-500">No posts available.</Text>}
            />

            <TouchableOpacity
                className="mt-4"
                onPress={() => navigation.goBack()}
            >
                <Text className="text-lg font-bold text-center text-blue-500 pb-5">Back to Feed</Text>
            </TouchableOpacity>
        </View>
    );
}
