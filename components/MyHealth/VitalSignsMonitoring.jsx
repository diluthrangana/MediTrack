import { View, Text, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MediDataContext from '../../context/MediDataContext';

export default function VitalSignsMonitoring() {
  const { userData } = useContext(MediDataContext);

  return (
    <View style={styles.container}>
      {/* Heart Rate Card */}
      <View style={styles.card}>
        <Icon name="heart-pulse" size={33} color="#C0C0C0" />
        <Text style={styles.value}>{userData?.heartRate || 'N/A'} bpm</Text>
      </View>
      
      {/* Blood Pressure Card */}
      <View style={styles.card}>
        <Icon name="blood-bag" size={33} color="#C0C0C0" />
        <Text style={styles.value}>
          {userData?.bloodPressure?.systolic || 'N/A'}/{userData?.bloodPressure?.diastolic || 'N/A'} mmHg
        </Text>
      </View>

      {/* Blood Sugar Card */}
      <View style={styles.card}>
        <Icon name="needle" size={35} color="#C0C0C0" />
        <Text style={styles.value}>{userData?.bloodSugar || 'N/A'} mg/dL</Text>
      </View>

      {/* Oxygen Saturation Card */}
      <View style={styles.card}>
        <Icon name="gas-cylinder" size={35} color="#C0C0C0" />
        <Text style={styles.value}>{userData?.oxygenSaturation || 'N/A'}%</Text>
      </View>

      {/* Body Temperature Card */}
      <View style={styles.card}>
        <Icon name="thermometer" size={35} color="#C0C0C0" />
        <Text style={styles.value}>{userData?.bodyTemperature || 'N/A'}°C</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Align all cards in a single row
    justifyContent: 'space-between', // Space out the cards evenly
    padding: 0,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 5, // Adjust margin between cards
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: '16%', // Each card occupies a portion of the row
    alignItems: 'center', // Center content within the card
  },
  value: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    marginTop: 5, // Add some space between icon and text
  },
});
