import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { useRouter } from "expo-router";
import MediDataContext from '../../context/MediDataContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function MedicationTracking() {
  const router = useRouter();
  const { userData } = useContext(MediDataContext);

  return (
    <TouchableOpacity
    style={styles.button}
    onPress={() => router.push('editmyhealth/EditMedication')}
  >   

      <View style={styles.card}>
        
        <Text style={styles.value}> <Icon name="pill" size={24} color="#3498db" /> {userData?.medicationName || 'N/A'}  {userData?.dosage || 'N/A'}  {userData?.frequency || 'N/A'} </Text>

       
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
    padding: 0,
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
  debugText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: 'red',
  },
});
