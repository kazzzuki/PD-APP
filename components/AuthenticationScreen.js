import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Pressable } from 'react-native';

const AuthenticationScreen = ({ navigation }) => {
  const [operatorId, setOperatorId] = useState('');

  const handleLogin = () => {
    if (operatorId) {
      navigation.navigate('Alerts', { operatorId });
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/spotless.png')} 
        style={styles.logo} 
        resizeMode="contain"
      />
      <Text style={styles.label}>User Authentication</Text>
      <TextInput
        placeholder="Operator ID"
        style={styles.input}
        value={operatorId}
        onChangeText={setOperatorId}
      />
      <Pressable style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  logo: {
    width: 400,
    height: 150,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    marginRight: 160,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AuthenticationScreen;
