import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import MediDataContext from '../../context/MediDataContext';
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./../../configs/firebase";
import { useNavigation } from 'expo-router';

export default function EditVaccinationStatus() {
    const { userData, setUserData } = useContext(MediDataContext);
    const [vaccinations, setVaccinations] = useState(userData?.vaccinations || []);
    const [newVaccine, setNewVaccine] = useState('');
    const navigation = useNavigation();

    const commonVaccines = [
        'COVID-19',
        'Influenza (Flu)',
        'Hepatitis A',
        'Hepatitis B',
        'Tetanus',
        'Diphtheria',
        'Pertussis (Whooping Cough)',
        'Measles',
        'Mumps',
        'Rubella',
        'Chickenpox (Varicella)',
        'Polio',
        'Human Papillomavirus (HPV)',
        'Meningococcal',
    ];

    const saveVaccinationStatus = async () => {
        const user = auth.currentUser;
        if (user) {
            const userDocRef = doc(db, "users", user.uid);
            await setDoc(userDocRef, { vaccinations }, { merge: true });
            setUserData(prev => ({ ...prev, vaccinations }));
            navigation.goBack(); // Navigate back to the previous screen
        }
    };

    const addVaccine = () => {
        if (newVaccine.trim()) {
            setVaccinations([...vaccinations, newVaccine.trim()]);
            setNewVaccine('');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Vaccination Status</Text>

            {commonVaccines.map((vaccine, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.option, vaccinations.includes(vaccine) && styles.selectedOption]}
                    onPress={() => setVaccinations(prev => {
                        if (prev.includes(vaccine)) {
                            return prev.filter(item => item !== vaccine);
                        } else {
                            return [...prev, vaccine];
                        }
                    })}
                >
                    <Text style={styles.optionText}>{vaccine}</Text>
                </TouchableOpacity>
            ))}

            {vaccinations.filter(vaccine => !commonVaccines.includes(vaccine)).map((vaccine, index) => (
                <View key={index} style={styles.customVaccine}>
                    <Text style={styles.optionText}>{vaccine}</Text>
                    <TouchableOpacity
                        onPress={() => setVaccinations(prev => prev.filter(item => item !== vaccine))}
                    >
                        <Text style={styles.removeText}>Remove</Text>
                    </TouchableOpacity>
                </View>
            ))}

            <View style={styles.addVaccineContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Add a new vaccine"
                    value={newVaccine}
                    onChangeText={setNewVaccine}
                />
                <Button title="Add" onPress={addVaccine} />
            </View>

            <Button title="Save" onPress={saveVaccinationStatus} disabled={vaccinations.length === 0} />
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
        fontSize: 18,
    },
    customVaccine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#007BFF',
        backgroundColor: '#E0F7FF',
    },
    removeText: {
        color: '#FF0000',
    },
    addVaccineContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginRight: 10,
    },
});
