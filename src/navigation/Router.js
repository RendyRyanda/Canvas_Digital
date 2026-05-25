import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "@expo/vector-icons/Ionicons";

// SCREENS
import SplashScreen from "../screens/SplashScreen";

import Login from "../screens/Login";

import Register from "../screens/Register";

import Home from "../screens/Home";

import Detail from "../screens/Detail";

import Category from "../screens/Category";

import Profile from "../screens/Profile";

import Favorite from "../screens/Favorite";

import AddMuseumForm from "../screens/AddMuseumForm";

import EditMuseumForm from "../screens/EditMuseumForm";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

// =========================
// BOTTOM TAB
// =========================
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#2563eb",

        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 5,
        },
      }}
    >
      {/* HOME */}
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      {/* CATEGORY */}
      <Tab.Screen
        name="Category"
        component={Category}
        options={{
          tabBarLabel: "Kategori",

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid" size={size} color={color} />
          ),
        }}
      />

      {/* PROFILE */}
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// =========================
// MAIN ROUTER
// =========================
export default function Router() {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      {/* SPLASH */}
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />

      {/* LOGIN */}
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />

      {/* REGISTER */}
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />

      {/* MAIN TAB */}
      <Stack.Screen
        name="Main"
        component={BottomTabs}
        options={{
          headerShown: false,
        }}
      />

      {/* DETAIL */}
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          title: "Detail Museum",

          headerTintColor: "#2563eb",
        }}
      />

      {/* FAVORITE */}
      <Stack.Screen
        name="Favorite"
        component={Favorite}
        options={{
          title: "Museum Favorit",

          headerTintColor: "#2563eb",
        }}
      />

      {/* ADD MUSEUM */}
      <Stack.Screen
        name="AddMuseumForm"
        component={AddMuseumForm}
        options={{
          title: "Tambah Museum",

          headerTintColor: "#2563eb",
        }}
      />

      {/* EDIT MUSEUM */}
      <Stack.Screen
        name="EditMuseumForm"
        component={EditMuseumForm}
        options={{
          title: "Edit Museum",

          headerTintColor: "#2563eb",
        }}
      />
    </Stack.Navigator>
  );
}
