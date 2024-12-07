import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SleepTracker() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [isFrozen, setIsFrozen] = useState(false); // State to track if time is frozen
  const [showPicker, setShowPicker] = useState(false);
  const [tempTime, setTempTime] = useState(selectedTime); // Temporary time for picker

  useEffect(() => {
    if (!showPicker) {
      const interval = setInterval(() => {
        if (!isFrozen) {
          setCurrentTime(new Date());
        }
      }, 1000); // Update current time every second if not frozen

      return () => clearInterval(interval);
    }
  }, [isFrozen, showPicker]);

  const toggleFreezeTime = () => {
    setIsFrozen(!isFrozen); // Toggle the frozen state
  };

  const onTimeChange = (event, selectedDate) => {
    if (event.type === "set") {
      setSelectedTime(selectedDate || selectedTime); // Set the selected time only when pressing OK
    }
    setShowPicker(false); // Close the picker after selection
  };

  const openPicker = () => {
    setTempTime(selectedTime); // Set temporary time to the current selected time
    setShowPicker(true); // Show the time picker
  };

  return (
    <View style={styles.container}>
      <View style={styles.maincard}>
        <View style={styles.chartarea}>
          <Icon name="sleep" size={25} color="#C0C0C0" />
        </View>

        <TouchableOpacity
          style={[styles.card, isFrozen && styles.frozenCard]}
          onPress={toggleFreezeTime}
        >
          <Text>{currentTime.toLocaleTimeString()}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={openPicker}>
          <Text>{selectedTime.toLocaleTimeString()}</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Icon name="alarm" size={33} color="#C0C0C0" />
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={tempTime}
            mode="time"
            display="default"
            onChange={onTimeChange} // Handle the time change only after the picker is closed
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  maincard: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  chartarea: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  frozenCard: {
    backgroundColor: '#add8e6', // Light blue background when frozen
  },
});
