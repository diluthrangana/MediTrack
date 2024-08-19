import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import MediDataContext from '../../context/MediDataContext';
import { useRouter } from 'expo-router';
import { auth, db } from "./../../configs/firebase";

export default function ProfileDetails() {
  const { userData } = useContext(MediDataContext);
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
  }, [user, userData]);

  // Define the profile data array
  const profData = [
    { did: 1, dtitle: 'Gender', dvalue: userData?.gender || 'Not specified', dlink: '/editprofile/editGender' },
    { did: 2, dtitle: 'Date of Birth', dvalue: userData?.dateOfBirth || 'Not specified', dlink: '/editprofile/editDateOfBirth' },
    { did: 3, dtitle: 'Height', dvalue: userData?.height || 'Not specified', dlink: '/editprofile/editHeight' },
    { did: 4, dtitle: 'Weight', dvalue: userData?.weight || 'Not specified', dlink: '/editprofile/editWeight' },
    { did: 5, dtitle: 'Blood Group', dvalue: userData?.bloodGroup || 'Not specified', dlink: '/editprofile/editBloodGroup' },
    { did: 6, dtitle: 'Medical Conditions', dvalue: userData?.medicalConditions || 'None', dlink: '/editprofile/editMedicalConditions' },
    { did: 7, dtitle: 'Current Medications', dvalue: userData?.currentMedications || 'None', dlink: '/editprofile/editCurrentMedications' },
    { did: 8, dtitle: 'Allergies', dvalue: userData?.allergies || 'None', dlink: '/editprofile/editAllergies' },
    { did: 9, dtitle: 'Vaccination Status', dvalue: userData?.vaccinations || 'Not specified', dlink: '/editprofile/editVaccinationStatus' },
    { did: 10, dtitle: 'Organ Donor Status', dvalue: userData?.organDonorStatus || 'Not specified', dlink: '/editprofile/editOrganDonorStatus' },
    { did: 11, dtitle: 'Surgical History', dvalue: userData?.surgicalHistory || 'Not specified', dlink: '/editprofile/editSurgicalHistory' },
    { did: 12, dtitle: 'Family Medical History', dvalue: userData?.familyMedicalHistory || 'Not specified', dlink: '/editprofile/ediFamilyMedicalHistory' },
    { did: 13, dtitle: 'Smoking Status', dvalue: userData?.smokingStatus || 'Not specified', dlink: '/editprofile/editSmokingStatus' },
    { did: 14, dtitle: 'Alcohol Consumption', dvalue: userData?.alcoholConsumption || 'Not specified', dlink: '/editprofile/editAlcoholConsumption' },
  ];

  const handlePress = (item) => {
    if (item.dlink) {
      router.push(item.dlink);
    }
  };

  return (
    <FlatList
      data={profData}
      keyExtractor={(item) => item.did.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item)}>
          <View style={styles.tab}>
            <Text style={styles.title}>{item.dtitle}</Text>
            <Text style={styles.value}>{item.dvalue}</Text>
          </View>
        </TouchableOpacity>
      )}
      ItemSeparatorComponent={() => (
        <View style={styles.separator} />
      )}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    paddingBottom: 230,
  },
  tab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',  // Slightly lighter font weight
    color: '#555',       // Lighter gray color
  },
  value: {
    fontSize: 13,
    color: '#666',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    opacity: 0.5,
  },
});
