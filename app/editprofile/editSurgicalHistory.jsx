import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import MediDataContext from '../../context/MediDataContext';
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../configs/firebase";
import { useNavigation } from 'expo-router';

export default function EditSurgicalHistory() {
    const { userData, setUserData } = useContext(MediDataContext);
    const [selectedSurgeries, setSelectedSurgeries] = useState(userData?.surgicalHistory || []);
    const [newSurgery, setNewSurgery] = useState('');
    const navigation = useNavigation();

    const commonSurgeries = [
        'Appendectomy',
        'Gallbladder Removal',
        'Hernia Repair',
        'Tonsillectomy',
        'Cataract Surgery',
        'C-Section',
        'Knee Replacement',
        'Heart Bypass Surgery',
    ];

    const toggleSelection = (surgery) => {
        setSelectedSurgeries(prev =>
            prev.includes(surgery)
                ? prev.filter(item => item !== surgery)
                : [...prev, surgery]
        );
    };

    const addNewSurgery = () => {
        if (newSurgery.trim()) {
            setSelectedSurgeries(prev => [...prev, newSurgery.trim()]);
            setNewSurgery('');
        }
    };

    const saveSurgicalHistory = async () => {
        const user = auth.currentUser;
        if (user) {
            const userDocRef = doc(db, "users", user.uid);
            await setDoc(userDocRef, { surgicalHistory: selectedSurgeries }, { merge: true });
            setUserData(prev => ({ ...prev, surgicalHistory: selectedSurgeries }));
            navigation.goBack(); // Navigate back to the previous screen
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Select Surgical History</Text>

            {commonSurgeries.map((surgery, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.option, selectedSurgeries.includes(surgery) && styles.selectedOption]}
                    onPress={() => toggleSelection(surgery)}
                >
                    <Text style={styles.optionText}>{surgery}</Text>
                </TouchableOpacity>
            ))}

            <TextInput
                style={styles.input}
                placeholder="Add another surgery"
                value={newSurgery}
                onChangeText={setNewSurgery}
            />
            <TouchableOpacity style={styles.addButton} onPress={addNewSurgery}>
                <Text style={styles.addButtonText}>Add Surgery</Text>
            </TouchableOpacity>

            <Button style={styles.button} title="Save" onPress={saveSurgicalHistory} disabled={selectedSurgeries.length === 0} />
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
