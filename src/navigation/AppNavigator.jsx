import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../theme/colors";

import SplashScreen from "../screens/SplashScreen";
import HomeScreen from "../screens/HomeScreen";
import TypesScreen from "../screens/TypesScreen";
import PlanetsScreen from "../screens/PlanetsScreen";
import DetailScreen from "../screens/DetailScreen";
import FilteredListScreen from "../screens/FilteredListScreen"; // isme sequence matter nahi karega

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "rgba(14, 14, 14, 0.95)",
          borderTopWidth: 1,
          borderTopColor: COLORS.glassBorder,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 65 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.3)",
        tabBarIcon: ({ color }) => {
          const icons = {
            Home: "home",
            Classification: "category",
            Planets: "public",
          };
          return (
            <MaterialIcons name={icons[route.name]} size={26} color={color} />
          );
        },
        tabBarLabelStyle: {
          fontFamily: "Jakarta_Bold",
          fontSize: 10,
          textTransform: "uppercase",
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Classification" component={TypesScreen} />
      <Tab.Screen name="Planets" component={PlanetsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.background },
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="FilteredList" component={FilteredListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
