import React, { useState, useEffect } from "react";
import AppLoading from "expo-app-loading";
import { TouchableOpacity } from "react-native";
import { BottomNavigation } from "react-native-paper";

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
import FavoriteScreen from "./screens/favorite";

// import ReadPdf from "./screens/note/readPdf";

import { observer } from "mobx-react-lite";
import { authentication } from "./stores/Auth.service";
import { favNote } from "./stores/Fav.service";
import { note } from "./stores/Note.service";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import axios from "axios";

axios.defaults.baseURL = "http://192.168.1.129:5001";

export default observer(function App() {
  const [userToken, setUserToken] = useState(null);
  const [isSignOut, setIsSignOut] = useState(true);

  const [isPress, setIsPress] = useState(false);

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

  const Stack = createNativeStackNavigator();
  const Tab = createMaterialBottomTabNavigator();

  const addFav = () => {
    // const { data } = await axios.get(`/favorite/my-favorite?nid=${}&uuid=${authentication.getProfile.account.uuid}`)
    // return data
  };

  const isHasFav = favNote.getNote.some(({ nid }) => nid === note.getNote.nid)

  useEffect(() => {
    const token = authentication.getProfile.accessToken;
    token && setUserToken(token);

    addFav()
  });

  const AuthenticatedTabs = () => {
    return (
      <Tab.Navigator barStyle={{ backgroundColor: "#4D3B9B" }}>
        <Tab.Screen
          name="Notes"
          component={HomeScreen}
          options={{
            title: "Notes",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="note-multiple"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Create Note"
          component={CreateNoteScreen}
          options={{
            title: "Create Note",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="plus" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Favorite Notes"
          component={FavoriteScreen}
          options={{
            title: "Favorite Notes",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="star" color={color} size={26} />
            ),
          }}
        />
        {/* <Tab.Screen
          name="ReadPdf"
          component={ReadPdf}
          options={{
            title: "ReadPdf",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="star" color={color} size={26} />
            ),
          }}
        /> */}
      </Tab.Navigator>
    );
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={!userToken ? "Nite" : "Home"}>
          {
            !authentication.getProfile.accessToken ? (
              <Stack.Group screenOptions={{ headerTintColor: '#fefeff', headerStyle: { backgroundColor: '#4D3B9B' }, headerTitleStyle: { color: '#fefeff' }, headerBackTitleStyle: { color: '#fefeff' } }}>
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
              <Stack.Group screenOptions={{ headerTintColor: '#fefeff', headerStyle: { backgroundColor: '#4D3B9B' }, headerTitleStyle: { color: '#fefeff' }, headerBackTitleStyle: { color: '#fefeff' } }}>
                <Stack.Screen
                  name="Home"
                  component={AuthenticatedTabs}
                />
                <Stack.Screen name="View Note"
                  component={NoteScreen}
                  options={{
                    headerRight: ({ color }) => (
                      <TouchableOpacity onPress={() => (setIsPress(isHasFav ? false : true), favNote.setNote(note.getNote))}>
                        <MaterialCommunityIcons
                          name="star"
                          color={!isHasFav ? "#fefeff" : 'yellow'}
                          size={26}
                        />
                      </TouchableOpacity>
                    )
                  }}
                />
                <Stack.Screen name="Edit Note" component={EditNoteScreen} />
              </Stack.Group>
            )
          }
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
});
