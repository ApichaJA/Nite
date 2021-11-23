import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import AppLoading from 'expo-app-loading'
import { StyleSheet, Text, View } from 'react-native';
import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'
import {
  Prompt_200ExtraLight,
  Prompt_300Light,
  Prompt_400Regular,
  Prompt_500Medium,
  Prompt_600SemiBold,
  Prompt_700Bold,
} from '@expo-google-fonts/prompt'

import LandingScreen from './screens/landing'
import RegisterScreen from './screens/account/register'
import LoginScreen from './screens/account/login'
import CreateNoteScreen from './screens/note/create'
import HomeScreen from './screens/index'

import { observer } from 'mobx-react-lite'
import { authentication } from './stores/Auth.service'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default observer(function App() {
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

  useEffect(() => {
    const token = authentication.getProfile.accessToken
    setUserToken(token)
  })

  const Stack = createNativeStackNavigator();

  if (!fontsLoaded) {
    return <AppLoading />
  }
  else {
    return (
      <NavigationContainer >
        <Stack.Navigator initialRouteName="Nite">
          {userToken === null ? (
            <Stack.Group>
              <Stack.Screen
                name="Nite"
                component={LandingScreen}
                options={{
                  headerShown: false,
                  // When logging out, a pop animation feels intuitive
                  // You can remove this if you want the default 'push' animation
                  animationTypeForReplace: isSignOut ? 'pop' : 'push',
                }}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
              />
              <Stack.Screen
                name="Register"
                component={RegisterScreen}
              />

            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
              />
              <Stack.Screen
                name="Create Note"
                component={CreateNoteScreen}
              />
            </Stack.Group>
          )}

          {/* <Stack.Group>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
            />
          </Stack.Group> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
})
