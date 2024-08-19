import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import MediDataContext from '../../context/MediDataContext';
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./../../configs/firebase";
import { useRouter, useNavigation } from 'expo-router';

export default function EditGender() {
    const { userData, setUserData } = useContext(MediDataContext);
    const [gender, setGender] = useState(userData?.gender || '');
    const navigation = useNavigation();

    const saveGender = async () => {
        const user = auth.currentUser;
        if (user) {
            const userDocRef = doc(db, "users", user.uid);
            await setDoc(userDocRef, { gender }, { merge: true });
            setUserData(prev => ({ ...prev, gender }));
            navigation.goBack(); // Navigate back to the previous screen
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Select Gender</Text>

            <TouchableOpacity
                style={[styles.option, gender === 'Male' && styles.selectedOption]}
                onPress={() => setGender('Male')}
            >
                <Text style={styles.optionText}>Male</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.option, gender === 'Female' && styles.selectedOption]}
                onPress={() => setGender('Female')}
            >
                <Text style={styles.optionText}>Female</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.option, gender === 'Other' && styles.selectedOption]}
                onPress={() => setGender('Other')}
            >
                <Text style={styles.optionText}>Other</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.option, gender === 'Prefer not to say' && styles.selectedOption]}
                onPress={() => setGender('Prefer not to say')}
            >
                <Text style={styles.optionText}>Prefer not to say</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.button, !gender && styles.disabledButton]} 
                onPress={saveGender} 
                disabled={!gender}
            >
                <Text style={styles.buttonText}>Save</Text>
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
    option: {
        width: '100%',
        height: 50,
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
    },
    selectedOption: {
        borderColor: '#007BFF',
        backgroundColor: '#E0F7FF',
    },
    optionText: {
        fontSize: 15,
    },
    button: {
        width: '100%',
        padding: 10,
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: '#007BFF',
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
