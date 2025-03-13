import { View, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import MediDataContext from '../context/MediDataContext';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./../configs/firebase";
import { useNavigation, useRouter } from 'expo-router';



export default function Loading() {
  const { userData, setUserData } = useContext(MediDataContext);
  const [loading, setLoading] = useState(true); 
  const user = auth.currentUser;
  const router = useRouter();
  

  useEffect(() => {
    const loadUserData = async () => {
      if (user) {
        try {
          const id = user.uid;
          const docRef = doc(db, "UserData", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error loading user data:", error);
        } finally {
          setLoading(false); 
        }
      }
    };

    loadUserData();
  }, [user]);

  useEffect(() => {
    if (!loading && userData) {
        router.push('./myhealth'); 
    }
  }, [loading, userData]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
