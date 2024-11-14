import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import { getImageURL } from "../utils/client"

const TemplateScreen = ({ navigation }) => {
  const [templateGenerated, setTemplateGenerated] = useState(false)
  const [isRecalibrating, setIsRecalibrating] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)
  let image_path = "template/defaultTemplate.png" // Default template image path

  useEffect(() => {
    const fetchImageUrl = async () => {
      const url = await getImageURL(image_path)
      setImageUrl(url)
    }
    fetchImageUrl()
  }, [image_path])

  const handleStart = () => {
    setTemplateGenerated(true)
    setIsRecalibrating(false)
  }

  const handleRecalibrate = () => {
    setIsRecalibrating(true)
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <Image
          style={styles.image}
          source={{ uri: imageUrl }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.startButton,
            templateGenerated && styles.disabledButton,
          ]}
          onPress={isRecalibrating ? null : handleStart}
          disabled={templateGenerated}
        >
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
        <View style={styles.spacer} />
        <TouchableOpacity
          style={[
            styles.recalibrateButton,
            !templateGenerated && styles.disabledButton,
          ]}
          onPress={handleRecalibrate}
          disabled={!templateGenerated}
        >
          <Text style={styles.buttonText}>Recalibrate</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: "space-between",
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    width: "100%",
    height: undefined,
  },
  imageBox: {
    width: 300,
    height: 300,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 120,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 65,
    marginBottom: 70,
  },
  spacer: {
    width: 40,
  },
  startButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  recalibrateButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: "grey",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
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
  },
  icon: {
    width: 40,
    height: 40,
  },
})

export default TemplateScreen
