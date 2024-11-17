import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  Vibration,
} from "react-native"
import {
  fetchAlertsData,
  supabase,
  deleteAlert,
  broadcastDebugCapture,
} from "../utils/client"
import { formatDateAndTime } from "../utils/timedate"
import Toolbar from "../components/Toolbar"
import COLORS from "../constants/colors"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"

// ;("use strict")

const AlertsScreen = ({ route, navigation }) => {
  const { operatorId } = route.params || {}
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    fetchAlerts()
    const channels = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Alerts" },
        (payload) => {
          console.log(
            new Date(),
            " | PostGres changes recieved, type: ",
            payload.eventType
          )
          fetchAlerts()
        }
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "Alerts" },
        (payload) => {
          console.log(
            new Date(),
            " | PostGres changes recieved, type: ",
            payload.eventType
          )
          newAlert()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channels)
    }
  }, [supabase])

  const fetchAlerts = async () => {
    const { data, error } = await supabase
      .from("Alerts")
      .select("*")
      .order("timedate", { ascending: false })

    if (error) {
      console.log(new Date(), " | Error fetching alerts: ", error)
    } else setAlerts(data)
  }

  const deleteSure = (uid, img_path) => {
    Alert.alert("Delete Alert", "Are you sure you want to delete this alert?", [
      {
        text: "Yes",
        onPress: () => handleDelete(uid, img_path),
        style: "destructive",
      },
      { text: "Cancel", style: "cancel" },
    ])
  }

  const handleDelete = (uid, img_path) => {
    deleteAlert(uid, img_path)
  }

  const newAlert = () => {
    const ONE_SECOND_IN_MS = 1000
    const PATTERN = [
      1 * ONE_SECOND_IN_MS,
      2 * ONE_SECOND_IN_MS,
      3 * ONE_SECOND_IN_MS,
    ]

    Vibration.vibrate(PATTERN)
    Alert.alert("", "New Alert Recieved", [
      { text: "Understood", style: "default" },
    ])
  }

  renderAlertItem = ({ item }) => {
    const { id, is_resolved, image_path, uid, timedate, description } = item
    const { date, time } = formatDateAndTime(timedate)
    return (
      <View key={uid} style={styles.alertBox}>
        <View style={styles.alertTexts}>
          <Text style={is_resolved ? styles.resolvedText : styles.activeText}>
            Status: {is_resolved ? "Resolved" : "Active"}
          </Text>
          <Text style={styles.text}>{time}</Text>
          <Text style={styles.text}>{date}</Text>
        </View>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => navigation.navigate("Alert Details", { item })}
        >
          <Text style={styles.buttonText}>Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => deleteSure(uid, image_path)}
          style={styles.deleteButton}
        >
          <MaterialCommunityIcons
            name="delete-outline"
            size={24}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.scrollContainer}
        data={alerts}
        keyExtractor={(item) => item.uid}
        renderItem={renderAlertItem}
      />
      <TouchableOpacity style={styles.debug} onPress={broadcastDebugCapture}>
        <Text style={{ fontSize: 16 }}>debug</Text>
      </TouchableOpacity>
      <Toolbar navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Lato_400Regular",
  },
  debug: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    padding: 16,
  },
  alertBox: {
    flexDirection: "row",
    backgroundColor: "#F6F6FB",
    borderRadius: 20,
    padding: 16,
    paddingRight: 5,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  alertTexts: {
    flex: 2,
  },
  activeText: {
    fontSize: 20,
    color: "red",
    fontWeight: "bold",
    fontFamily: "Lato_400Regular",
  },
  resolvedText: {
    fontSize: 20,
    color: "green",
    fontFamily: "Lato_400Regular",
  },
  detailsButton: {
    flex: 1,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.accent,
    padding: 5,
    marginVertical: 10,
    borderRadius: 20,
  },
  deleteButton: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: "Lato_400Regular",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingVertical: 10,
    backgroundColor: "white",
    height: 80,
  },
  tab: {
    alignItems: "center",
    padding: 10,
  },
  icon: {
    width: 40,
    height: 40,
  },
})

export default AlertsScreen
