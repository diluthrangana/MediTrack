import { View, Text, StyleSheet } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import MediDataContext from '../../context/MediDataContext';

export default function BMI() {
  const { userData } = useContext(MediDataContext);
  const [bmi, setBMI] = useState(null);

  useEffect(() => {
    if (userData?.height && userData?.weight) {
      const heightInMeters = userData.height / 100; // Assuming height is in centimeters
      const bmiValue = (userData.weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBMI(bmiValue);
    }
  }, [userData]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Your BMI:</Text>
        <Text style={styles.value}>{bmi ? bmi : 'N/A'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 55,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  value: {
    fontSize: 12,
    color: '#333',
  },
});
