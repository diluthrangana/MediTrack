import React, { useState, useContext, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, TextInput, AppState } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { storage } from '../../configs/firebase';
import MediDataContext from '../../context/MediDataContext';
import { auth, db } from "../../configs/firebase"; 
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function MyHealthProfile() {
  const user = auth.currentUser;
  const { userData, setUserData } = useContext(MediDataContext);
  
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState(userData?.Name || '');



  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {userData ? (
          <Image source={{ uri:'./../../assets/images/profile1.png'  }} style={styles.image} />
        ) : (
          <Image source={require('./../../assets/images/profile1.png')} style={styles.image} />
        )}
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: "left",
    backgroundColor: "#f5f5f5",
    paddingLeft:20,
    
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
