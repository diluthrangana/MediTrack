import { View, AppState, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import MedicationTracking from '../../components/MyHealth/MedicationTracking';
import FitnessTracking from '../../components/MyHealth/FitnessTracking'
import VitalSignsMonitoring from '../../components/MyHealth/VitalSignsMonitoring'
import MyHealthProfile from '../../components/MyHealth/MyHealthProfile'
import MediDataContext from '../../context/MediDataContext';
import SleepTracker from '../../components/MyHealth/SleepTracker'
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./../../configs/firebase";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function MyHealth() {

  const { userData, setUserData } = useContext(MediDataContext);
  const user = auth.currentUser;


  useEffect(() => {
    const saveUserData = async () => {
      if (user && userData) {
        const docRef = doc(db, "UserData", user.uid);
        try {
          await setDoc(docRef, userData, { merge: true }); // Use merge to update only the fields that changed
          console.log('User data saved!');
        } catch (error) {
          console.error('Error saving user data:', error);
        }
      }
    };

    const handleAppStateChange = (nextAppState) => {
      if (nextAppState.match(/inactive|background/)) {
        saveUserData();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove(); // Clean up the listener
    };
  }, [user, userData]);

  return (
    <ScrollView >
      <View >
      <View>
          <MyHealthProfile/>
        </View>

        <View>
          <MedicationTracking />
        </View>

        <View >
          <VitalSignsMonitoring />
        </View>
        
        <View >
          <FitnessTracking />
        </View>

        <View >
          <SleepTracker />
        </View>

        <View style={styles.emergencyButtoncontainer}>
        <TouchableOpacity style={styles.emergencyButton} onPress={() => alert('Emergency button pressed!')}>
        <Icon name="alert" size={20} color="#fff" />
        <Text style={styles.emergencyButtonText}>Emergency</Text>
      </TouchableOpacity>
      </View>
        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  emergencyButtoncontainer: {
    alignItems: 'center',
    paddingBottom:20,
    paddingTop:20,
  },
  emergencyButton: {
    width:200,
    height:40,
    backgroundColor: '#e74c3c',
    borderRadius: 50,
    //padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  emergencyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
})