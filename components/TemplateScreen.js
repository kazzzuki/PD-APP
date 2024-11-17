import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import { getImageURL, broadcastGenerateTemplate } from "../utils/client"
import Toolbar from "../components/Toolbar"
import COLORS from "../constants/colors"

const TemplateScreen = ({ navigation }) => {
  const [templateGenerated, setTemplateGenerated] = useState(false)
  const [isRecalibrating, setIsRecalibrating] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)
  let image_path = "template/template" // Default template image path

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
    broadcastGenerateTemplate()
  }

  const handleRecalibrate = () => {
    setIsRecalibrating(true)
    broadcastGenerateTemplate()
  }

  const DynamicImage = ({ imageUrl }) => {
    const [updatedUrl, setUpdatedUrl] = useState(`${imageUrl}?t=${Date.now()}`)

    useEffect(() => {
      // Poll the server periodically to check for updates
      const interval = setTimeout(() => {
        setUpdatedUrl(`${imageUrl}?t=${Date.now()}`) // Append a new timestamp
      }, 5000) // Poll every 5 seconds (adjust interval as needed)
    }, [imageUrl])

    return (
      <Image
        style={styles.image}
        source={{ uri: updatedUrl }}
        resizeMode="contain"
      />
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <DynamicImage imageUrl={imageUrl} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.startButton,
            templateGenerated && { backgroundColor: "grey" },
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
            !templateGenerated && { backgroundColor: "grey" },
          ]}
          onPress={handleRecalibrate}
          disabled={!templateGenerated}
        >
          <Text style={styles.buttonText}>Recalibrate</Text>
        </TouchableOpacity>
      </View>
      <Toolbar navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    width: "100%",
    height: undefined,
  },
  imageBox: {
    flex: 1,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 80,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 65,
    marginBottom: 70,
  },
  spacer: {
    width: 40,
  },
  startButton: {
    width: 100,
    backgroundColor: COLORS.accent,
    padding: 10,
    borderRadius: 5,
  },
  recalibrateButton: {
    width: 100,
    backgroundColor: COLORS.accent,
    padding: 10,
    borderRadius: 5,
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
