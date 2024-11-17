import React from "react"
import { View, TouchableOpacity, Image, StyleSheet, Alert } from "react-native"
import COLORS from "../constants/colors"

import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons"

export default Toolbar = ({ navigation }) => {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Template")}
        style={styles.tab}
      >
        <MaterialIcons name="image" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Alerts")}
        style={styles.tab}
      >
        <MaterialCommunityIcons name="alert-circle" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        // onPress={() => navigation.navigate("Statistics")}
        onPress={() =>
          Alert.alert("Work in progress", "Feature will be available soon", [
            { text: "OK", style: "default" },
          ])
        }
        style={styles.tab}
      >
        <SimpleLineIcons name="graph" size={24} color="white" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  tabContainer: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.gray,
    height: 80,
  },
  tab: {
    borderRadius: 1000,
    padding: 10,
    backgroundColor: COLORS.primary,
    alignItems: "center",
  },
  icon: {
    width: 40,
    height: 40,
  },
})
