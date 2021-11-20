import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/account/login'
import RegisterScreen from './screens/account/register'
import ProfileScreen from './screens/account/index'

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function App() {
  const [userToken, setUserToken] = useState(null)
  const [isSignOut, setIsSignOut] = useState(true)

  const Stack = createNativeStackNavigator();
  const Tab = createMaterialBottomTabNavigator();

  return (
    <NavigationContainer >
      <Stack.Navigator>
        {userToken == null ? (
          // No token found, user isn't signed in
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
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
