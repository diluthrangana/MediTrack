import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useContext } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import MediDataContext from '../../context/MediDataContext';
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./../../configs/firebase";
import { useNavigation } from 'expo-router';

export default function editDateOfBirth() {
    const { userData, setUserData } = useContext(MediDataContext);
    const [dateOfBirth, setDateOfBirth] = useState(userData?.dateOfBirth ? new Date(userData.dateOfBirth) : new Date());
    const [showPicker, setShowPicker] = useState(false);
    const navigation = useNavigation();

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || dateOfBirth;
        setShowPicker(false);
        setDateOfBirth(currentDate);
    };

    const saveDateOfBirth = async () => {
        const user = auth.currentUser;
        if (user) {
            const userDocRef = doc(db, "users", user.uid);
            await setDoc(userDocRef, { dateOfBirth: dateOfBirth.toDateString() }, { merge: true });
            setUserData(prev => ({ ...prev, dateOfBirth: dateOfBirth.toDateString() }));
            navigation.goBack(); // Navigate back to the previous screen
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Select Date of Birth</Text>

            <TouchableOpacity 
                style={styles.dateButton} 
                onPress={() => setShowPicker(true)}
            >
                <Text style={styles.dateButtonText}>
                    {dateOfBirth.toDateString()}
                </Text>
            </TouchableOpacity>

            {showPicker && (
                <DateTimePicker
                    value={dateOfBirth}
                    mode="date"
                    display="default"
                    onChange={onChange}
                />
            )}

            <TouchableOpacity 
                style={styles.saveButton} 
                onPress={saveDateOfBirth}
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
    dateButton: {
        width: '100%',
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        marginBottom: 20,
    },
    dateButtonText: {
        fontSize: 18,
        color: '#333',
    },
    saveButton: {
        width: '100%',
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#007BFF',
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
