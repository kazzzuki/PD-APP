import { StyleSheet, Text, View, ActivityIndicator, Modal } from "react-native"
import React from "react"
import COLORS from "../constants/colors"

const LoadingView = ({ visibility, isModal }) => {
  if (isModal === true) {
    return (
      <Modal animationType="fade" transparent={false} visible={visibility}>
        <View style={styles.modalContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </Modal>
    )
  } else {
    return (
      <View style={styles.modalContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default LoadingView
