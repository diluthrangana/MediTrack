import { View, Text, StyleSheet, Button, PermissionsAndroid } from 'react-native';
import React, { useState, useEffect } from 'react';
import { BluetoothManager } from '@react-native-community/bluetooth';

export default function VitalSignsProperties() {
  const [isConnected, setIsConnected] = useState(false);
  const [heartRate, setHeartRate] = useState(null);
  const [device, setDevice] = useState(null);

  useEffect(() => {
    requestBluetoothPermission();
  }, []);

  const requestBluetoothPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        {
          title: "Bluetooth Permission",
          message: "This app needs access to your Bluetooth to connect to devices.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Bluetooth permission granted");
      } else {
        console.log("Bluetooth permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const scanForDevices = async () => {
    try {
      const devices = await BluetoothManager.scanDevices();
      console.log('Devices found:', devices);
      if (devices.length > 0) {
        connectToDevice(devices[0].id); // Assuming the first device is the smartwatch
      }
    } catch (error) {
      console.error('Error scanning for devices:', error);
    }
  };

  const connectToDevice = async (deviceId) => {
    try {
      const connectedDevice = await BluetoothManager.connect(deviceId);
      setDevice(connectedDevice);
      setIsConnected(true);
      console.log('Connected to device:', connectedDevice);
      readHeartRate(connectedDevice);
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  const readHeartRate = async (connectedDevice) => {
    const heartRateCharacteristicUUID = '2A37'; // Heart Rate Measurement UUID
    try {
      const data = await connectedDevice.readCharacteristic(heartRateCharacteristicUUID);
      const heartRateValue = parseHeartRateData(data);
      setHeartRate(heartRateValue);
      console.log('Heart rate data:', heartRateValue);
    } catch (error) {
      console.error('Failed to read heart rate:', error);
    }
  };

  const parseHeartRateData = (data) => {
    // Parsing logic specific to the device's heart rate data format
    return data[1]; // Example: Assuming heart rate is at index 1
  };

  const disconnectFromDevice = async () => {
    try {
      await device.disconnect();
      setIsConnected(false);
      setDevice(null);
      setHeartRate(null);
      console.log('Disconnected from device');
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vital Signs Monitoring</Text>
      <Button title="Scan for Devices" onPress={scanForDevices} />
      {isConnected ? (
        <>
          <Text style={styles.label}>Heart Rate:</Text>
          <Text style={styles.value}>{heartRate ? `${heartRate} bpm` : 'Loading...'}</Text>
          <Button title="Disconnect" onPress={disconnectFromDevice} />
        </>
      ) : (
        <Text style={styles.status}>Not connected</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  status: {
    fontSize: 16,
    color: 'red',
    marginTop: 15,
    textAlign: 'center',
  },
});
