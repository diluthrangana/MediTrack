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
    style={styles.container}
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
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginBottom:15,
    
    
  },
  card: {
    width:'90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 0,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: 'center',
  
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
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
