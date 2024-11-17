import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"
import { formatDateAndTime } from "../utils/timedate"
import { getImageURL, resolveAlert } from "@/utils/client"
import COLORS from "@/constants/colors"
import { Colors } from "react-native/Libraries/NewAppScreen"

const AlertDetailsScreen = ({ route, navigation }) => {
  const { item } = route.params
  const { id, is_resolved, image_path, uid, timedate, description } = item
  const { date, time } = formatDateAndTime(timedate)
  const [imageUrl, setImageUrl] = useState(
    "https://tgqeqtuhfntgmcnjgxsh.supabase.co/storage/v1/object/public/AlertImages/default/defaultImage.png"
  )

  useEffect(() => {
    const fetchImageUrl = async () => {
      const url = await getImageURL(image_path)
      if (url) setImageUrl(url)
    }
    fetchImageUrl()
  }, [image_path])

  const handleResolve = () => {
    resolveAlert(uid)
    console.log(new Date(), " | Resolving alert", uid)
    navigation.navigate("Alerts")
  }

  return (
    <View style={styles.container}>
      <Text>Date Detected: {date}</Text>
      <Text>Time: {time}</Text>
      <View style={styles.imageBox}>
        <Image
          style={styles.image}
          source={{ uri: imageUrl }}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity
        style={[
          styles.resolvedButton,
          is_resolved && { backgroundColor: COLORS.gray },
        ]}
        onPress={handleResolve}
        disabled={is_resolved}
      >
        <Text style={styles.buttonText}>Resolved</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    width: "100%",
    height: undefined,
  },
  imageBox: {
    width: 250,
    height: 250,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  resolvedButton: {
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 20,
    marginTop: 50,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
})

export default AlertDetailsScreen
