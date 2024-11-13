import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native"
import { fetchAlertsData } from "../utils/client"
import { formatDateAndTime } from "../utils/timedate"
import { supabase } from "../utils/client"
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
      .order("timedate", { ascending: true })

    if (error) {
      console.log(new Date(), " | Error fetching alerts: ", error)
    } else setAlerts(data)
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
          <Text style={styles.buttonText}>
            {is_resolved ? "Resolved" : "Details"}
          </Text>
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
    marginLeft: 100,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
    padding: 8,
    marginTop: 10,
  },
  resolvedButton: {
    flex: 1,
    marginLeft: 100,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    padding: 8,
    marginTop: 10,
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
