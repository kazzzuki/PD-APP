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
} from "react-native"
import {
  fetchAlertsData,
  supabase,
  deleteAlert,
  broadcastDebugCapture,
} from "../utils/client"
import { formatDateAndTime } from "../utils/timedate"
;("use strict")

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
          console.log(payload)
          fetchAlerts()
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

  renderAlertItem = ({ item }) => {
    const { id, is_resolved, image_path, uid, timedate, description } = item
    const { date, time } = formatDateAndTime(timedate)
    return (
      <View key={uid} style={styles.alertBox}>
        <View style={styles.alertTexts}>
          <Text style={is_resolved ? styles.resolvedText : styles.activeText}>
            Status: {is_resolved ? "Resolved" : "Active"}
          </Text>
          <Text>{time}</Text>
          <Text>{date}</Text>
        </View>
        <TouchableOpacity
          style={is_resolved ? styles.resolvedButton : styles.detailsButton}
          onPress={() =>
            !is_resolved && navigation.navigate("AlertDetails", { item })
          }
          disabled={is_resolved}
        >
          <Text style={styles.buttonText}>{is_resolved ? "" : "Details"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => deleteSure(uid, image_path)}
          style={styles.deleteButton}
        >
          <Text>X</Text>
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
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Template")}
          style={styles.tab}
        >
          <Image
            source={require("../assets/images/template.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Alerts")}
          style={styles.tab}
        >
          <Image
            source={require("../assets/images/alerts.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Statistics")}
          style={styles.tab}
        >
          <Image
            source={require("../assets/images/statistics.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  debug: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
  alertBox: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 16,
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
  },
  resolvedText: {
    fontSize: 20,
    color: "green",
  },
  detailsButton: {
    flex: 1,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
    padding: 5,
    marginVertical: 10,
    borderRadius: 20,
  },
  resolvedButton: {
    flex: 1,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    marginTop: 10,
  },
  deleteButton: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "black",
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
