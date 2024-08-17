import { View, Text, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import MediDataContext from '../../context/MediDataContext';

export default function VitalSignsMonitoring() {
  const { userData } = useContext(MediDataContext);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Heart Rate:</Text>
      <Text style={styles.value}>{userData?.heartRate || 'N/A'} bpm</Text>

      <Text style={styles.label}>Blood Pressure:</Text>
      <Text style={styles.value}>
        {userData?.bloodPressure?.systolic || 'N/A'}/{userData?.bloodPressure?.diastolic || 'N/A'} mmHg
      </Text>

      <Text style={styles.label}>Blood Sugar Levels:</Text>
      <Text style={styles.value}>{userData?.bloodSugar || 'N/A'} mg/dL</Text>

      <Text style={styles.label}>Oxygen Saturation (SpO2):</Text>
      <Text style={styles.value}>{userData?.oxygenSaturation || 'N/A'}%</Text>

      <Text style={styles.label}>Body Temperature:</Text>
      <Text style={styles.value}>{userData?.bodyTemperature || 'N/A'}°C</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
});
