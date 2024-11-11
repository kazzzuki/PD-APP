import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AlertDetailsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Date Detected: Jun 10, 2024</Text>
      <Text>Time: 9:41 AM</Text>
      <View style={styles.imageBox}>
        <Text>Defective Image</Text>
      </View>
      <TouchableOpacity style={styles.resolvedButton} onPress={() => {}}>
        <Text style={styles.buttonText}>Resolved</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  imageBox: {
    width: 250,
    height: 250,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  resolvedButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 50,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AlertDetailsScreen;
