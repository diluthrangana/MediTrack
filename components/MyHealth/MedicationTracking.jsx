import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { useRouter } from "expo-router";
import MediDataContext from '../../context/MediDataContext';

export default function MedicationTracking() {
  const router = useRouter();
  const { userData } = useContext(MediDataContext);

  return (
    <TouchableOpacity
    style={styles.button}
    onPress={() => router.push('editmyhealth/EditMedication')}
  >   

      <View style={styles.card}>
        <Text style={styles.label}>Medication Name:</Text>
        <Text style={styles.value}>{userData?.medicationName || 'N/A'}</Text>

        <Text style={styles.label}>Dosage:</Text>
        <Text style={styles.value}>{userData?.dosage || 'N/A'}</Text>

        <Text style={styles.label}>Frequency:</Text>
        <Text style={styles.value}>{userData?.frequency || 'N/A'}</Text>
      </View>

      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150,
    justifyContent: 'center',
    
  },
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
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  debugText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: 'red',
  },
});
