import React, { useState, createContext } from "react"
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native"
import { authUser } from "../utils/client"
import COLORS from "../constants/colors"

const AuthenticationScreen = ({ navigation }) => {
  const [operatorId, setOperatorId] = useState("")
  const userID = createContext(null)

  const handleLogin = async () => {
    isAuth = await authUser(operatorId)
    if (isAuth) {
      navigation.navigate("Alerts", { operatorId })
    } else {
      Alert.alert("", "Invalid Operator ID!", [
        {
          text: "OK",
          style: "cancel",
        },
      ])
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/spotless.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.bottom}>
        <Text style={styles.label}>User Authentication</Text>
        <TextInput
          placeholder="Operator ID"
          placeholderTextColor={"white"}
          style={styles.input}
          value={operatorId}
          onChangeText={setOperatorId}
          textAlign="center"
        />
        <Pressable style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
  },
  imageContainer: {
    flex: 0.3,
  },
  bottom: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
  },
  logo: {
    flex: 1,
    width: 300,
    height: 150,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    fontFamily: "Lato_400Regular",
  },
  input: {
    color: "white",
    width: "100%",
    padding: 10,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 30,
    fontFamily: "Lato_400Regular",
  },
  loginButton: {
    backgroundColor: COLORS.accent,
    padding: 10,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: "Lato_400Regular",
  },
})

export default AuthenticationScreen
