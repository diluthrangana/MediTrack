import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useContext } from 'react';
import MediDataContext from '../../context/MediDataContext';
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../configs/firebase";
import { useNavigation } from 'expo-router';

export default function editAlcoholConsumption() {
    const { userData, setUserData } = useContext(MediDataContext);
    const [alcoholConsumption, setAlcoholConsumption] = useState(userData?.alcoholConsumption || '');
    const navigation = useNavigation();

    const saveAlcoholConsumption = async () => {
        const user = auth.currentUser;
        if (user) {
            const userDocRef = doc(db, "users", user.uid);
            await setDoc(userDocRef, { alcoholConsumption }, { merge: true });
            setUserData(prev => ({ ...prev, alcoholConsumption }));
            navigation.goBack(); // Navigate back to the previous screen
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Edit Alcohol Consumption</Text>

            <TouchableOpacity
                style={[styles.option, alcoholConsumption === 'Never' && styles.selectedOption]}
                onPress={() => setAlcoholConsumption('Never')}
            >
                <Text style={styles.optionText}>Never</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.option, alcoholConsumption === 'Occasionally' && styles.selectedOption]}
                onPress={() => setAlcoholConsumption('Occasionally')}
            >
                <Text style={styles.optionText}>Occasionally</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.option, alcoholConsumption === 'Regularly' && styles.selectedOption]}
                onPress={() => setAlcoholConsumption('Regularly')}
            >
                <Text style={styles.optionText}>Regularly</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.option, alcoholConsumption === 'Prefer not to say' && styles.selectedOption]}
                onPress={() => setAlcoholConsumption('Prefer not to say')}
            >
                <Text style={styles.optionText}>Prefer not to say</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.saveButton, !alcoholConsumption && styles.disabledButton]} 
                onPress={saveAlcoholConsumption} 
                disabled={!alcoholConsumption}
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
