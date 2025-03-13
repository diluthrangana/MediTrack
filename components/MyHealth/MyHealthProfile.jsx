import React, { useState, useContext, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, TextInput, AppState } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BMI from '../MyHealth/BMI';
import { storage } from '../../configs/firebase';
import MediDataContext from '../../context/MediDataContext';
import { auth, db } from "../../configs/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { healthTips } from '../../data/healthTips';

export default function MyHealthProfile() {
  const user = auth.currentUser;
  const { userData, setUserData } = useContext(MediDataContext);
  
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState(userData?.Name || '');
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  
  // Change tip every 10 seconds
  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTipIndex(prevIndex => 
        prevIndex === healthTips.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    
    return () => clearInterval(tipInterval);
  }, []);
  
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {userData.PPLink ? (
          <Image source={{ uri: userData?.PPLink }} style={styles.image} />
        ) : (
          <Image source={require('./../../assets/images/profile1.png')} style={styles.image} />
        )}
      </View>
      <View style={styles.BMIContainer}>
        <BMI/>
      </View>
      <View style={styles.tipsContainer}>
        <Text style={styles.tipTitle}>Health Tip</Text>
        <Text style={styles.tipText}>{healthTips[currentTipIndex].tip}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 40,
    paddingBottom: 0,
    alignItems: "left",
    backgroundColor: "#f5f5f5",
    paddingLeft: 20,
  },
  BMIContainer: {
    paddingLeft: 10,
  },
  imageContainer: {
    position: "relative",
    width: 100,
    height: 100,
    borderRadius: 75,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 3,
    borderColor: "#007AFF",
  },
  tipsContainer: {
    marginLeft: 10,
    width: 140,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    justifyContent: 'center',
  },
  tipTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
    color: '#007AFF',
  },
  tipText: {
    fontSize: 12,
    color: '#333',
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  deleteIcon: {
    position: "absolute",
    bottom: 2,
    right: -3,
    borderRadius: 20,
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  editIcon: {
    position: "absolute",
    bottom: 2,
    left: -3,
    borderRadius: 20,
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  editIconNoImg: {
    position: "absolute",
    bottom: 25,
    right: -15,
    borderRadius: 20,
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
  },
  nameText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  nameInput: {
    fontSize: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#007AFF",
    color: "#333",
    marginRight: 10,
    minWidth: 150,
  },
});