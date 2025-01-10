import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabase } from '../supabaseClient';

export default function AuthScreen({ navigation }) {
    const [input, setInput] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // check for existing session on app launch
        const checkSession = async () => {
            const {data: {session}, error} = await supabase.auth.getSession();

            if (session){
                console.log(`Session restored: ${session}`);
                navigation.replace("Feed");
            }
            else {
                console.log(`No session found`);
            }
        }

        checkSession();
    }, [])

    async function handleLogin() {
        console.log("Login pressed")

        let email = input; // initial assignment for email
        
        // check if input has @ sign
        // if not then it is a username
        if (!input.includes('@')) {
            const {data, error} = await supabase
                .from('profiles')
                .select('email')
                .eq('username', input)
                .single()
            
            if (error) {
                console.log(`Error fetching email for usermame: ${error}`);
                Alert.alert("Invalid username or email");
                return;
            }

            // get email associated with username
            email = data.email;
        }

        // supabase auth
        const { error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            console.log("Error: ", error);
            Alert.alert(error.message);
            return;
        }

        console.log("Login successful");
        navigation.replace("Feed");
    }
    
    return (
        <View className='flex-1 justify-center px-6'>
            <Text className='text-2xl font-bold text-center mb-4'>Login</Text>

            {/* Email input */}
            <TextInput
                placeholder='email or username'
                className='border border-gray-300 rounded-lg p-3 mb-3'
                onChangeText={setInput}
                value={input}
            />
    
            {/* Password input */}
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
