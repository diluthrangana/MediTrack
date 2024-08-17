import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import MediDataContext from '../../context/MediDataContext';
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./../../configs/firebase";
import { useRouter, useNavigation } from 'expo-router';

export default function EditFitness() {
  const { userData, setUserData } = useContext(MediDataContext);

  // State to hold form data
  const navigation = useNavigation()
  const [medicationName, setMedicationName] = useState(userData?.medicationName || '');
  const [dosage, setDosage] = useState(userData?.dosage || '');
  const [frequency, setFrequency] = useState(userData?.frequency || '');

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Select Budget',
      headerTransparent: true,
    });
  }, [navigation]);

  const handleSave = async () => {
      // Update context state
      setUserData(prevState => ({
          ...prevState,
          medicationName,
          dosage,
          frequency,
      }));

      // Save updated data to Firestore
      const user = auth.currentUser;
      if (user) {
          try {
              const docRef = doc(db, "UserData", user.uid);
              await setDoc(docRef, {
                  medicationName,
                  dosage,
                  frequency
              }, { merge: true });
              console.log("Document successfully written!");
          } catch (error) {
              console.error("Error writing document: ", error);
          }
      }
  };

  return (
      <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.heading}>Edit Medication Details</Text>
          
          <TextInput
              style={styles.input}
              placeholder="Medication Name"
              value={medicationName}
              onChangeText={setMedicationName}
          />
          
          <TextInput
              style={styles.input}
              placeholder="Dosage (e.g., 500mg)"
              value={dosage}
              onChangeText={setDosage}
          />
          
          <TextInput
              style={styles.input}
              placeholder="Frequency (e.g., twice a day)"
              value={frequency}
              onChangeText={setFrequency}
          />
          
          <View style={styles.buttonContainer}>
              <Button title="Save" onPress={handleSave} />
          </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    buttonContainer: {
        marginTop: 20,
    },
});
