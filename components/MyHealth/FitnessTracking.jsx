import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { useRouter } from "expo-router";
import MediDataContext from '../../context/MediDataContext';

export default function FitnessTracking() {

  const router = useRouter();
  const { userData } = useContext(MediDataContext);

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => router.push('editmyhealth/EditMedication')}
    >   
      <View style={styles.card}>
        <Text style={styles.label}>Step Count:</Text>
        <Text style={styles.value}>{userData?.stepCount || 'N/A'}</Text>

        <Text style={styles.label}>Calories Burned:</Text>
        <Text style={styles.value}>{userData?.caloriesBurned || 'N/A'}</Text>

        <Text style={styles.label}>Exercise Log:</Text>
        <Text style={styles.value}>{userData?.exerciseLog || 'N/A'}</Text>

        <Text style={styles.label}>Workout Routine:</Text>
        <Text style={styles.value}>{userData?.workoutRoutine || 'N/A'}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  card: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
});
