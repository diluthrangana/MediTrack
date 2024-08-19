import React, { useState, useContext, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, TextInput, AppState } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../configs/firebase';
import MediDataContext from '../../context/MediDataContext';
import { auth, db } from "../../configs/firebase"; 
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function ProfileCard() {
  const user = auth.currentUser;
  const { userData, setUserData } = useContext(MediDataContext);
  
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState(userData?.Name || '');


  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission to access gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      await saveImageToDB(selectedImageUri);
    }
  };

  const deleteImage = () => {
    setUserData(prevState => ({
      ...prevState,
      PPLink: null,
    }));
  };

  const saveImageToDB = async (uri) => {
    if (uri && user) {
      const response = await fetch(uri);
      const blob = await response.blob();

      const storageRef = ref(storage, `images/${Date.now()}`);
      const snapshot = await uploadBytes(storageRef, blob);
      const newDownloadURL = await getDownloadURL(snapshot.ref);

      //setDownloadURL(newDownloadURL);
      setUserData(prevState => ({
        ...prevState,
        PPLink: newDownloadURL,
      }));

      const docRef = doc(db, "UserData", user.uid);
      await setDoc(docRef, { PPLink: newDownloadURL }, { merge: true });
    }
  };

  const saveNameToDB = async () => {
    if (user && name) {
      setUserData(prevState => ({
        ...prevState,
        Name: name,
      }));

      const docRef = doc(db, "UserData", user.uid);
      await setDoc(docRef, { Name: name }, { merge: true });
      
      setIsEditingName(false);
    }
  };

  useEffect(() => {
    const saveUserData = async () => {
      if (user && userData) {
        const docRef = doc(db, "UserData", user.uid);
        await setDoc(docRef, userData, { merge: true });
      }
    };

    const handleAppStateChange = (nextAppState) => {
      if (nextAppState.match(/inactive|background/)) {
        saveUserData();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [user, userData]);

  // Safe access to userData
  const safeUserData = userData || {};

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {userData.PPLink ? (
          <Image source={{ uri: userData?.PPLink }} style={styles.image} />
        ) : (
          <Image source={require('./../../assets/images/profile1.png')} style={styles.image} />
        )}
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={userData.PPLink ? styles.editIcon : styles.editIconNoImg}
          onPress={pickImage}
        >
          <Ionicons name="pencil" size={24} color="#ffffff" />
        </TouchableOpacity>
        {userData?.PPLink && (
          <TouchableOpacity style={styles.deleteIcon} onPress={deleteImage}>
            <Ionicons name="trash" size={24} color="#ffffff" />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.nameContainer}>
        {isEditingName ? (
          <TextInput
            style={styles.nameInput}
            value={name}
            onChangeText={setName}
            onSubmitEditing={saveNameToDB}
            returnKeyType="done"
            placeholder="Enter your name"
          />
        ) : (
          <Text style={styles.nameText}>{safeUserData.Name || "No name set"}</Text>
        )}
        <TouchableOpacity onPress={() => {
          if (isEditingName) {
            saveNameToDB();
          } else {
            setIsEditingName(true);
          }
        }}>
          <Ionicons name={isEditingName ? "checkmark" : "pencil"} size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  imageContainer: {
    position: "relative",
    width: 120,
    height: 120,
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
