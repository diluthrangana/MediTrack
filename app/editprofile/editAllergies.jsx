import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useContext } from 'react';
import MediDataContext from '../../context/MediDataContext';
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./../../configs/firebase";
import { useNavigation } from 'expo-router';

export default function EditAllergies() {
    const { userData, setUserData } = useContext(MediDataContext);
    const [allergies, setAllergies] = useState(userData?.allergies || '');
    const navigation = useNavigation();

    const saveAllergies = async () => {
        const user = auth.currentUser;
        if (user) {
            const userDocRef = doc(db, "users", user.uid);
            await setDoc(userDocRef, { allergies }, { merge: true });
            setUserData(prev => ({ ...prev, allergies }));
            navigation.goBack(); // Navigate back to the previous screen
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Edit Allergies</Text>
            
            <TextInput
                style={styles.input}
                placeholder="Enter your allergies"
                value={allergies}
                onChangeText={setAllergies}
                multiline
                numberOfLines={4}
            />

            <TouchableOpacity 
                style={[styles.saveButton, !allergies && styles.disabledButton]} 
                onPress={saveAllergies} 
                disabled={!allergies}
            >
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#f0f0f0',
        marginBottom: 20,
        fontSize: 16,
        color: '#333',
        textAlignVertical: 'top',
    },
    saveButton: {
        width: '100%',
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#007BFF',
        alignItems: 'center',
        marginTop: 20,
    },
    disabledButton: {
        backgroundColor: '#aaa',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
