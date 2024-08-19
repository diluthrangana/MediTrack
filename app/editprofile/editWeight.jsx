import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useContext } from 'react';
import MediDataContext from '../../context/MediDataContext';
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./../../configs/firebase";
import { useNavigation } from 'expo-router';

export default function EditWeight() {
    const { userData, setUserData } = useContext(MediDataContext);
    const [weight, setWeight] = useState(userData?.weight || '');
    const navigation = useNavigation();

    const saveWeight = async () => {
        const user = auth.currentUser;
        if (user) {
            const userDocRef = doc(db, "users", user.uid);
            await setDoc(userDocRef, { weight }, { merge: true });
            setUserData(prev => ({ ...prev, weight }));
            navigation.goBack(); // Navigate back to the previous screen
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Edit Weight</Text>
            
            <TextInput
                style={styles.input}
                placeholder="Enter your weight (e.g., 70 kg)"
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
            />

            <TouchableOpacity 
                style={[styles.saveButton, !weight && styles.disabledButton]} 
                onPress={saveWeight} 
                disabled={!weight}
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
