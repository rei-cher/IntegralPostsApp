import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabase } from '../supabaseClient';

export default function AuthScreen({ navigation }) {
    const [email, setEmail] = useState('test@email.com');
    const [password, setPassword] = useState('test');

    async function handleLogin() {
        console.log("Login pressed")
        const {data: {session}, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });
        console.log(supabase.auth.signInWithPassword({
            email: email,
            password: password
            })
        );
        if (session) {
            console.log("Session success");
            navigation.replace("Feed");
        }

        if (error) {
            console.log("Error: ", error);
            Alert.alert(error.message);
        }
    }
    
    return (
        <View className='flex-1 justify-center px-6'>
            <Text className='text-2xl font-bold text-center mb-4'>Login</Text>
            <TextInput
                placeholder='email'
                className='border border-gray-300 rounded-lg p-3 mb-3'
                onChangeText={setEmail}
                value={email}
            />
    
            <TextInput
                placeholder='password'
                className='border border-gray-300 rounded-lg p-3 mb-3'
                secureTextEntry
                onChangeText={setPassword}
                value={password}
            />

            <View className='flex-row justify-evenly space-x-4 py-6'>
                <TouchableOpacity
                    className='bg-blue-500 rounded-full py-3 px-6 w-32 self-center'
                    onPress={handleLogin}
                >
                    <Text className='text-lg font-semibold text-center'>
                        Login
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className='bg-green-500 rounded-full py-3 px-6 w-32 self-center'
                    onPress={() => navigation.navigate("Signup")}
                >
                    <Text className='text-lg font-semibold text-center'>
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </View>
    
        </View>
    )
};
