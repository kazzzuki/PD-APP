import React, { useEffect } from "react"
import { View, StyleSheet, TouchableOpacity, Image } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import AuthenticationScreen from "../components/AuthenticationScreen"
import AlertsScreen from "../components/AlertsScreen"
import AlertDetailsScreen from "../components/AlertDetailsScreen"
import TemplateScreen from "../components/TemplateScreen"
import StatisticsScreen from "../components/StatisticsScreen"
import Fullscreen from "../components/Fullscreen"
import { supabase } from "../utils/client"
import {
  useFonts,
  Lato_400Regular,
  Lato_700Bold,
} from "@expo-google-fonts/lato"
import AppLoading from "expo-app-loading"
import Entypo from "@expo/vector-icons/Entypo"
import COLORS from "@/constants/colors"

const Stack = createNativeStackNavigator()

const SettingsButton = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate("Authentication")}>
    <Entypo name="log-out" size={24} color={COLORS.primary} />
  </TouchableOpacity>
)

export default function App() {
  let [fontsLoaded] = useFonts({
    Lato_400Regular,
    Lato_700Bold,
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={styles.container}>
      <Stack.Navigator initialRouteName="Authentication">
        <Stack.Screen
          name="Authentication"
          component={AuthenticationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Alerts"
          component={AlertsScreen}
          options={({ navigation }) => ({
            headerLeft: () => <SettingsButton navigation={navigation} />,
            headerTitleAlign: "center",
            animation: "none",
          })}
        />
        <Stack.Screen
          name="Alert Details"
          component={AlertDetailsScreen}
          options={{
            headerBackTitleVisible: false,
            headerTitleAlign: "center",
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="Template"
          component={TemplateScreen}
          options={({ navigation }) => ({
            headerLeft: () => <SettingsButton navigation={navigation} />,
            headerTitleAlign: "center",
            animation: "none",
          })}
        />
        <Stack.Screen
          name="Statistics"
          component={StatisticsScreen}
          options={({ navigation }) => ({
            headerLeft: () => <SettingsButton navigation={navigation} />,
            headerTitleAlign: "center",
            animation: "none",
          })}
        />
        <Stack.Screen
          name="Fullscreen"
          component={Fullscreen}
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />
      </Stack.Navigator>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
})
