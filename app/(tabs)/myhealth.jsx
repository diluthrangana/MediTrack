import { View, AppState, ScrollView, StyleSheet } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import MedicationTracking from '../../components/MyHealth/MedicationTracking';
import FitnessTracking from '../../components/MyHealth/FitnessTracking'
import VitalSignsMonitoring from '../../components/MyHealth/VitalSignsMonitoring'
import MyHealthProfile from '../../components/MyHealth/MyHealthProfile'
import MediDataContext from '../../context/MediDataContext';
import SleepTracker from '../../components/MyHealth/SleepTracker'
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./../../configs/firebase";

export default function MyHealth() {

  const { userData, setUserData } = useContext(MediDataContext);
  const user = auth.currentUser;

  useEffect(() => {
    const loadUserData = async () => {
      if (user) {
        const id = user.uid; 
        const docRef = doc(db, "UserData", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
          //console.log("User data loaded:", docSnap.data());
        } else {
          console.log("No such document!");
        }
      }
    };
    loadUserData();
  }, [user]);

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
        
      </View>
    </ScrollView>
  );
};

