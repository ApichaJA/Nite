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

axios.defaults.baseURL = "http://192.168.1.129:5001";

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
    setUserToken(token);
  });
  const Tab = createMaterialBottomTabNavigator();

  const Stack = createNativeStackNavigator();

  function HomeStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="View Note" component={NoteScreen} />
        <Stack.Screen name="Edit Note" component={EditNoteScreen} />
      </Stack.Navigator>
    );
  }

  HomeStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = navigation.state.routes[navigation.state.index].params.showTabBar; 

    return {
      tabBarVisible,
    };
};

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return true ? (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Nite">
          {/* {!userToken ? ( */}
          <Stack.Group>
            <Stack.Screen
              name="Nite"
              component={LandingScreen}
              options={{
                headerShown: false,
                // When logging out, a pop animation feels intuitive
                // You can remove this if you want the default 'push' animation
                animationTypeForReplace: isSignOut ? "pop" : "push",
              }}
            />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Create Note" component={CreateNoteScreen} />
            <Stack.Screen name="View Note" component={NoteScreen} />
            <Stack.Screen name="Edit Note" component={EditNoteScreen} />
          </Stack.Group>
          {/* ) : (
            <Stack.Group>

            </Stack.Group>
          )} */}

          {/* <Stack.Group>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
            />
          </Stack.Group> */}
        </Stack.Navigator>
      </NavigationContainer>
    ) : authentication.getProfile.accessToken ? (
      <NavigationContainer>
        <Tab.Navigator barStyle={{ backgroundColor: "#4D3B9B" }}>
          <Tab.Screen
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
            name="Home"
            component={HomeScreen}
          />
          <Tab.Screen
            options={{
              tabBarLabel: "Post",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="post" color={color} size={26} />
              ),
            }}
            name="Create Note"
            component={CreateNoteScreen}
          />
          <Tab.Screen
            options={{
              tabBarLabel: "Profile",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="human" color={color} size={26} />
              ),
            }}
            name="Login"
            component={LoginScreen}
          />
          <Tab.Screen name="View Note" component={HomeStack}/>
        </Tab.Navigator>
      </NavigationContainer>
    ) : (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Nite">
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
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
});
