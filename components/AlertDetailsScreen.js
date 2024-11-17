import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"
import { formatDateAndTime } from "../utils/timedate"
import { getImageURL, resolveAlert } from "@/utils/client"
import COLORS from "@/constants/colors"
import { Colors } from "react-native/Libraries/NewAppScreen"

const AlertDetailsScreen = ({ route, navigation }) => {
  const { id, is_resolved, image_path, uid, timedate, description } =
    route.params.item
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
      <View style={styles.textBox}>
        <Text style={[styles.text, { fontSize: 12, marginBottom: 2 }]}>
          {uid}
        </Text>
        <Text style={[styles.text, { fontSize: 24 }]}>{date}</Text>
        <Text style={[styles.text, { fontSize: 20 }]}>{time}</Text>
        <Text
          style={[
            styles.text,
            { fontSize: 18, margin: 30, color: COLORS.primary },
          ]}
        >
          {description ? description : "No Description"}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.imageBox}
        onPress={() => navigation.navigate("Fullscreen", { imageUrl })}
      >
        <Image
          style={styles.image}
          source={{ uri: imageUrl }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
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
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Lato_400Regular",
  },
  textBox: {
    flex: 1,
    borderRadius: 50,
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.gray,
    paddingTop: 20,
  },
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
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  resolvedButton: {
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontFamily: "Lato_400Regular",
  },
})

export default AlertDetailsScreen
