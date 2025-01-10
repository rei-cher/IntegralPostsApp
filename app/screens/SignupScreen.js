import React, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { supabase } from "../supabaseClient";

export default function SignupScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSignup = async () => {
        try{
            // sign up user
            const {data: {user}, error} = await supabase.auth.signUp({
                email: email,
                password: password,
            });
    
            if (error) {
                clearFields();
                Alert.alert(`Signup error: ${error.message}`);
            }
    
            // insert user's info into profiles table
            const {error: profileError} = await supabase
                .from('profiles')
                .insert([
                    {
                        id: user.id,
                        username,
                        firstName: firstName,
                        lastName: lastName,
                        email
                    }
                ]);
            
            if (profileError) {
                // delete the user if profile insertion fails
                await supabase.auth.admin.deleteUser(user.id); // needs admin role for this operation
                clearFields();
                Alert.alert(`Profile saving error: ${profileError.message}`);
            }
            else {
                // success, navigate to Auth
                Alert.alert("Signup Successful", "Your account has been created.");
                clearFields();
                navigation.navigate('Auth');
            }
        }
        catch (e) {
            // handle errors
            Alert.alert("Error: ". e.message);
            clearFields();
        }
    };

    // clearing fields
    const clearFields = () => {
        setEmail('');
        setPassword('');
        setUsername('');
        setFirstName('');
        setLastName('');
    }

    return (
        <View className='justify-center p-10 bg-gray-100'>
            <Text className='text-2xl font-bold text-center mb-6'>Sign Up</Text>

            {/* First Name Input */}
            <TextInput
                placeholder="First Name"
                className="border border-gray-300 rounded-lg p-3 mb-4 bg-white"
                value={firstName}
                onChangeText={setFirstName}
            />

            {/* Last Name Input */}
            <TextInput
                placeholder="Last Name"
                className="border border-gray-300 rounded-lg p-3 mb-4 bg-white"
                value={lastName}
                onChangeText={setLastName}
            />

            {/* Username Input */}
            <TextInput
                placeholder="Username"
                className="border border-gray-300 rounded-lg p-3 mb-4 bg-white"
                value={username}
                onChangeText={setUsername}
            />

            {/* Email Input */}
            <TextInput
                placeholder="Email"
                className="border border-gray-300 rounded-lg p-3 mb-4 bg-white"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            {/* Password Input */}
            <TextInput
                placeholder="Password"
                className="border border-gray-300 rounded-lg p-3 mb-4 bg-white"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity
                className="bg-green-500 rounded-full py-3 px-6 w-full"
                onPress={handleSignup}
            >
                <Text className="text-lg font-semibold text-white text-center">Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
                className="mt-20"
                onPress={() => navigation.goBack()}
            >
                <Text className="font-semibold text-center text-blue-500">Back to Login</Text>
            </TouchableOpacity>
        </View>
    )
}