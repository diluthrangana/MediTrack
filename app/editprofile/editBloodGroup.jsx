import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useContext } from 'react';
import MediDataContext from '../../context/MediDataContext';
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./../../configs/firebase";
import { useNavigation } from 'expo-router';

export default function EditBloodGroup() {
    const { userData, setUserData } = useContext(MediDataContext);
    const [bloodGroup, setBloodGroup] = useState(userData?.bloodGroup || '');
    const navigation = useNavigation();

    const saveBloodGroup = async () => {
        const user = auth.currentUser;
        if (user) {
            const userDocRef = doc(db, "users", user.uid);
            await setDoc(userDocRef, { bloodGroup }, { merge: true });
            setUserData(prev => ({ ...prev, bloodGroup }));
            navigation.goBack(); // Navigate back to the previous screen
        }
    };

    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Select Blood Group</Text>

            {bloodGroups.map((group) => (
                <TouchableOpacity
                    key={group}
                    style={[styles.option, bloodGroup === group && styles.selectedOption]}
                    onPress={() => setBloodGroup(group)}
                >
                    <Text style={styles.optionText}>{group}</Text>
                </TouchableOpacity>
            ))}

            <TouchableOpacity 
                style={[styles.saveButton, !bloodGroup && styles.disabledButton]} 
                onPress={saveBloodGroup} 
                disabled={!bloodGroup}
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
        backgroundColor: '#f0f0f0',
    },
    selectedOption: {
        borderColor: '#007BFF',
        backgroundColor: '#E0F7FF',
    },
    optionText: {
        fontSize: 18,
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
