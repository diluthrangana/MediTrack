import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import MediDataContext from '../../context/MediDataContext';
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./../../configs/firebase";
import { useNavigation } from 'expo-router';

export default function EditCurrentMedications() {
    const { userData, setUserData } = useContext(MediDataContext);
    const [selectedMedications, setSelectedMedications] = useState(userData?.currentMedications || []);
    const [newMedication, setNewMedication] = useState('');
    const navigation = useNavigation();

    const commonMedications = [
        'Aspirin',
        'Ibuprofen',
        'Acetaminophen',
        'Antibiotics',
        'Antidepressants',
        'Antihistamines',
        'Blood Pressure Medications',
        'Cholesterol Medications',
        'Insulin',
        'Thyroid Medications'
    ];

    const toggleSelection = (medication) => {
        setSelectedMedications(prev =>
            prev.includes(medication)
                ? prev.filter(item => item !== medication)
                : [...prev, medication]
        );
    };

    const addNewMedication = () => {
        if (newMedication.trim()) {
            setSelectedMedications(prev => [...prev, newMedication.trim()]);
            setNewMedication('');
        }
    };

    const saveCurrentMedications = async () => {
        const user = auth.currentUser;
        if (user) {
            const userDocRef = doc(db, "users", user.uid);
            await setDoc(userDocRef, { currentMedications: selectedMedications }, { merge: true });
            setUserData(prev => ({ ...prev, currentMedications: selectedMedications }));
            navigation.goBack(); // Navigate back to the previous screen
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Select Current Medications</Text>

            {commonMedications.map((medication, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.option, selectedMedications.includes(medication) && styles.selectedOption]}
                    onPress={() => toggleSelection(medication)}
                >
                    <Text style={styles.optionText}>{medication}</Text>
                </TouchableOpacity>
            ))}

            <TextInput
                style={styles.input}
                placeholder="Add another medication"
                value={newMedication}
                onChangeText={setNewMedication}
            />
            <TouchableOpacity style={styles.addButton} onPress={addNewMedication}>
                <Text style={styles.addButtonText}>Add Medication</Text>
            </TouchableOpacity>

            <Button style={styles.button} title="Save" onPress={saveCurrentMedications} disabled={selectedMedications.length === 0} />
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
