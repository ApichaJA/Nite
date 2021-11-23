import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import AppLoading from "expo-app-loading";
import { StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import {
  Prompt_200ExtraLight,
  Prompt_300Light,
  Prompt_400Regular,
  Prompt_500Medium,
  Prompt_600SemiBold,
  Prompt_700Bold,
} from "@expo-google-fonts/prompt";

import LandingScreen from "./screens/landing";
import RegisterScreen from "./screens/account/register";
import LoginScreen from "./screens/account/login";
import CreateNoteScreen from "./screens/note/create";
import HomeScreen from "./screens/index";
import NoteScreen from "./screens/note/index";
import EditNoteScreen from "./screens/note/edit";

import { observer } from "mobx-react-lite";
import { authentication } from "./stores/Auth.service";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import axios from "axios";

axios.defaults.baseURL = "http://192.168.138.253:5001";

export default observer(function App() {
  const [userToken, setUserToken] = useState(null);
  const [isSignOut, setIsSignOut] = useState(true);
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
    Roboto_700Bold,
  });

  useEffect(() => {
    const token = authentication.getProfile.accessToken;
    token && setUserToken(token);

    console.log(token)
  }, []);
  // const Tab = createMaterialBottomTabNavigator();

  const Stack = createNativeStackNavigator();

  // function HomeStack() {
  //   return (
  //     <Stack.Navigator>
  //       <Stack.Screen name="View Note" component={NoteScreen} />
  //       <Stack.Screen name="Edit Note" component={EditNoteScreen} />
  //     </Stack.Navigator>
  //   );
  // }

  // HomeStack.navigationOptions = ({ navigation }) => {
  //   let tabBarVisible = navigation.state.routes[navigation.state.index].params.showTabBar;

  //   return {
  //     tabBarVisible,
  //   };
  // };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={!userToken ? "Nite" : "Home"}>
          {
            !authentication.getProfile.accessToken ? (
              <Stack.Group>
                <Stack.Screen
                  options={{
                    headerShown: false,
                    animationTypeForReplace: isSignOut ? "pop" : "push",
                  }}
                  name="Nite"
                  component={LandingScreen}
                />
                <Stack.Screen
                  options={{
                    headerShown: false,
                  }}
                  name="Login"
                  component={LoginScreen}
                />
                <Stack.Screen
                  options={{
                    headerShown: false,
                  }}
                  name="Register"
                  component={RegisterScreen}
                />
                <Stack.Screen
                  options={{
                    headerShown: false,
                  }}
                  name="Home"
                  component={HomeScreen}
                />
                <Stack.Screen name="View Note" component={NoteScreen} />
              </Stack.Group>
            ) : (
              <Stack.Group>
                <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                />
                <Stack.Screen name="Create Note" component={CreateNoteScreen} />
                <Stack.Screen name="View Note" component={NoteScreen} />
                <Stack.Screen name="Edit Note" component={EditNoteScreen} />
              </Stack.Group>
            )
          }
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
});
