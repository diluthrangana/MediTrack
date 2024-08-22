import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { useRouter } from "expo-router";
import MediDataContext from '../../context/MediDataContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SleepTracker() {
  const router = useRouter();
  const { userData } = useContext(MediDataContext);

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => router.push('editmyhealth/EditSleep')}
    >
      <View style={styles.card}>
        <Icon name="sleep" size={24} color="#4a90e2" style={styles.icon} />
        <Text style={styles.label}>Sleep Tracker</Text>
        <Text style={styles.value}>
          {userData?.sleepHours ? `${userData.sleepHours} hrs` : 'No data available'}
        </Text>
        <View style={styles.iconContainer}>
          <Icon name="arrow-right" size={20} color="#4a90e2" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    height: 60,
    backgroundColor: '#f5f7fa',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4a90e2',
    flex: 1,
    marginLeft: 10,
  },
  value: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  button: {
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  icon: {
    marginLeft: 10,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
