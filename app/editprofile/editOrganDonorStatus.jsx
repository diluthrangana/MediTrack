import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Button } from 'react-native';
import MediDataContext from '../../context/MediDataContext';
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./../../configs/firebase";
import { useNavigation } from 'expo-router';

export default function EditOrganDonorStatus() {
    const { userData, setUserData } = useContext(MediDataContext);
    const [selectedOrgans, setSelectedOrgans] = useState(userData?.organDonorStatus || []);
    const navigation = useNavigation();

    const organs = [
        'Kidney',
        'Liver (Lobe)',
        'Lung (Lobe)',
        'Bone Marrow',
        'Blood',
        'Skin',
        'Cornea',
    ];

    const toggleSelection = (organ) => {
        setSelectedOrgans(prev =>
            prev.includes(organ)
                ? prev.filter(item => item !== organ)
                : [...prev, organ]
        );
    };

    const saveOrganDonorStatus = async () => {
        const user = auth.currentUser;
        if (user) {
            const userDocRef = doc(db, "users", user.uid);
            await setDoc(userDocRef, { organDonorStatus: selectedOrgans }, { merge: true });
            setUserData(prev => ({ ...prev, organDonorStatus: selectedOrgans }));
            navigation.goBack(); // Navigate back to the previous screen
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Select Donated Organs</Text>

            {organs.map((organ, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.option, selectedOrgans.includes(organ) && styles.selectedOption]}
                    onPress={() => toggleSelection(organ)}
                >
                    <Text style={styles.optionText}>{organ}</Text>
                </TouchableOpacity>
            ))}

            <Button style={styles.button} title="Save" onPress={saveOrganDonorStatus} disabled={selectedOrgans.length === 0} />
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
        marginTop: 20,
    },
});
