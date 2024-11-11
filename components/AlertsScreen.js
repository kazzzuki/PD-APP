import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

const alerts = [
  { status: 'Active', time: '10:48:28 A.M.', date: '04/11/2024', resolved: false },
  { status: 'Resolved', time: '10:48:28 A.M.', date: '04/11/2024', resolved: true },
  { status: 'Resolved', time: '10:48:28 A.M.', date: '04/11/2024', resolved: true },
];

const AlertsScreen = ({ route, navigation }) => {
  const { operatorId } = route.params || {};

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {alerts.map((alert, index) => (
          <View key={index} style={styles.alertBox}>
            <Text style={alert.resolved ? styles.resolvedText : styles.activeText}>
              Status: {alert.status}
            </Text>
            <Text>{alert.time}</Text>
            <Text>{alert.date}</Text>
            <TouchableOpacity
              style={alert.resolved ? styles.resolvedButton : styles.detailsButton}
              onPress={() => !alert.resolved && navigation.navigate('AlertDetails')}
              disabled={alert.resolved}
            >
              <Text style={styles.buttonText}>{alert.resolved ? 'Resolved' : 'Details'}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Template')} style={styles.tab}>
          <Image source={require('../assets/images/template.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Alerts')} style={styles.tab}>
          <Image source={require('../assets/images/alerts.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Statistics')} style={styles.tab}>
          <Image source={require('../assets/images/statistics.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
  alertBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 16,
    marginBottom: 10,
  },
  activeText: {
    color: 'red',
    fontWeight: 'bold',
  },
  resolvedText: {
    color: 'green',
  },
  detailsButton: {
    backgroundColor: '#ccc',
    padding: 8,
    marginTop: 10,
  },
  resolvedButton: {
    backgroundColor: '#e0e0e0',
    padding: 8,
    marginTop: 10,
  },
  buttonText: {
    color: 'black',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 10,
    backgroundColor: 'white',
    height: 80,
  },
  tab: {
    alignItems: 'center',
    padding: 10,
  },
  icon: {
    width: 40,
    height: 40,
  },
});

export default AlertsScreen;