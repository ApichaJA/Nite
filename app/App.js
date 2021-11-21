import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import AppLoading from 'expo-app-loading'
import { StyleSheet, Text, View } from 'react-native';
import {
  useFonts,
  Prompt_200ExtraLight,
  Prompt_300Light,
  Prompt_400Regular,
  Prompt_500Medium,
  Prompt_600SemiBold,
  Prompt_700Bold,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold
} from '@expo-google-fonts/dev'

import LandingScreen from './screens/landing'
import RegisterScreen from './screens/account/register'
import ProfileScreen from './screens/account/index'

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function App() {
  const [userToken, setUserToken] = useState(null)
  const [isSignOut, setIsSignOut] = useState(true)
  let [fontsLoaded] = useFonts({
    Prompt_200ExtraLight,
    Prompt_300Light,
    Prompt_400Regular,
    Prompt_500Medium,
    Prompt_600SemiBold,
    Prompt_700Bold,
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  })

  const Stack = createNativeStackNavigator();
  const Tab = createMaterialBottomTabNavigator();

  if (!fontsLoaded) {
    return <AppLoading />
  }
  else {
    return (
      <NavigationContainer >
        <Stack.Navigator>
          {userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="Login"
              component={LandingScreen}
              options={{
                headerShown: false,
                // When logging out, a pop animation feels intuitive
                // You can remove this if you want the default 'push' animation
                animationTypeForReplace: isSignOut ? 'pop' : 'push',
              }}
            />
          ) : (
            // User is signed in
            <Stack.Screen name="Home" component={ProfileScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
