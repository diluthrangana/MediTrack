import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useContext } from 'react';
import MediDataContext from '../../context/MediDataContext';
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./../../configs/firebase";
import { useNavigation } from 'expo-router';

export default function EditSmokingStatus() {
    const { userData, setUserData } = useContext(MediDataContext);
    const [smokingStatus, setSmokingStatus] = useState(userData?.smokingStatus || '');
    const navigation = useNavigation();

    const saveSmokingStatus = async () => {
        const user = auth.currentUser;
        if (user) {
            const userDocRef = doc(db, "users", user.uid);
            await setDoc(userDocRef, { smokingStatus }, { merge: true });
            setUserData(prev => ({ ...prev, smokingStatus }));
            navigation.goBack(); // Navigate back to the previous screen
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Edit Smoking Status</Text>

            <TouchableOpacity
                style={[styles.option, smokingStatus === 'Smoker' && styles.selectedOption]}
                onPress={() => setSmokingStatus('Smoker')}
            >
                <Text style={styles.optionText}>Smoker</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.option, smokingStatus === 'Non-smoker' && styles.selectedOption]}
                onPress={() => setSmokingStatus('Non-smoker')}
            >
                <Text style={styles.optionText}>Non-smoker</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.option, smokingStatus === 'Former smoker' && styles.selectedOption]}
                onPress={() => setSmokingStatus('Former smoker')}
            >
                <Text style={styles.optionText}>Former smoker</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.option, smokingStatus === 'Prefer not to say' && styles.selectedOption]}
                onPress={() => setSmokingStatus('Prefer not to say')}
            >
                <Text style={styles.optionText}>Prefer not to say</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.saveButton, !smokingStatus && styles.disabledButton]} 
                onPress={saveSmokingStatus} 
                disabled={!smokingStatus}
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
    option: {
        width: '100%',
        padding: 15,
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
        fontSize: 16,
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
