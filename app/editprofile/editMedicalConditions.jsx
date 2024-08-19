import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import MediDataContext from '../../context/MediDataContext';
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./../../configs/firebase";
import { useNavigation } from 'expo-router';

export default function EditMedicalConditions() {
    const { userData, setUserData } = useContext(MediDataContext);
    const [selectedConditions, setSelectedConditions] = useState(userData?.medicalConditions || []);
    const [newCondition, setNewCondition] = useState('');
    const navigation = useNavigation();

    const commonConditions = [
        'Diabetes',
        'Hypertension',
        'Asthma',
        'Allergy',
        'Heart Disease',
        'Chronic Pain',
        'Arthritis',
        'Cancer',
        'Stroke',
        'Epilepsy'
    ];

    const toggleSelection = (condition) => {
        setSelectedConditions(prev =>
            prev.includes(condition)
                ? prev.filter(item => item !== condition)
                : [...prev, condition]
        );
    };

    const addNewCondition = () => {
        if (newCondition.trim()) {
            setSelectedConditions(prev => [...prev, newCondition.trim()]);
            setNewCondition('');
        }
    };

    const saveMedicalConditions = async () => {
        const user = auth.currentUser;
        if (user) {
            const userDocRef = doc(db, "users", user.uid);
            await setDoc(userDocRef, { medicalConditions: selectedConditions }, { merge: true });
            setUserData(prev => ({ ...prev, medicalConditions: selectedConditions }));
            navigation.goBack(); // Navigate back to the previous screen
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Select Medical Conditions</Text>

            {commonConditions.map((condition, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.option, selectedConditions.includes(condition) && styles.selectedOption]}
                    onPress={() => toggleSelection(condition)}
                >
                    <Text style={styles.optionText}>{condition}</Text>
                </TouchableOpacity>
            ))}

            <TextInput
                style={styles.input}
                placeholder="Add another condition"
                value={newCondition}
                onChangeText={setNewCondition}
            />
            <TouchableOpacity style={styles.addButton} onPress={addNewCondition}>
                <Text style={styles.addButtonText}>Add Condition</Text>
            </TouchableOpacity>

            <Button style={styles.button} title="Save" onPress={saveMedicalConditions} disabled={selectedConditions.length === 0} />
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
    input: {
        width: '100%',
        height: 50,
        padding: 10,
        marginVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        fontSize: 15,
    },
    addButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#007BFF',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 15,
    },
    button: {
        width: '100%',
        marginTop: 20,
    },
});
