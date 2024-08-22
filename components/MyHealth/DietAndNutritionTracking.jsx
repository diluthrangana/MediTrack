import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { useRouter } from "expo-router";
import MediDataContext from '../../context/MediDataContext';

export default function DietAndNutritionTracking() {
  const router = useRouter();
  const { userData } = useContext(MediDataContext);

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => router.push('editmyhealth/EditDietAndNutrition')}
    >   
      <View style={styles.card}>
        <Text style={styles.label}>Calorie Intake:</Text>
        <Text style={styles.value}>{userData?.calorieIntake || 'N/A'} kcal</Text>

        <Text style={styles.label}>Water Intake:</Text>
        <Text style={styles.value}>{userData?.waterIntake || 'N/A'} liters</Text>

        <Text style={styles.label}>Last Meal Logged:</Text>
        <Text style={styles.value}>{userData?.lastMeal || 'N/A'}</Text>

        <Text style={styles.label}>Current Diet Plan:</Text>
        <Text style={styles.value}>{userData?.dietPlan || 'N/A'}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 15,
    color: '#333',
  },
  button: {
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
