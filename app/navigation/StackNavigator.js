import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FeedScreen from "../screens/FeedScreen";
import AuthScreen from "../screens/AuthScreen";
import SignupScreen from "../screens/SignupScreen";

const Stack = createStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Auth">
            <Stack.Screen name="Auth" component={AuthScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Feed" component={FeedScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}