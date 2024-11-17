import { StyleSheet, Text, View, Image, Dimensions } from "react-native"
import React, { useState, useEffect } from "react"

const Fullscreen = ({ route, navigation }) => {
  const { imageUrl } = route.params
  const [imageStyles, setImageStyles] = useState({})

  useEffect(() => {
    // Fetch image dimensions
    Image.getSize(
      imageUrl,
      (width, height) => {
        if (width > height) {
          // Landscape image: rotate and fit into portrait layout
          setImageStyles({
            transform: [{ rotate: "90deg" }],
            width: height, // Use screen height for the rotated width
            height: width, // Use screen width for the rotated height
            alignSelf: "center", // Center the rotated image
          })
        } else {
          // Portrait image: no rotation
          setImageStyles({
            width: height,
            height: width, // Maintain aspect ratio
            aspectRatio: 1,
          })
        }
      },
      (error) => {
        console.error("Error loading image", error)
      }
    )
  }, [imageUrl])
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={[styles.image, imageStyles]}
        resizeMode="contain"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
  },
})

export default Fullscreen
