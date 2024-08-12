import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require('./../assets/images/background1.png')}
        style={{ width: '100%', height: 400 }}
      />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Travel Guide</Text>
        <Text style={styles.subtitle}>
        Your AI-powered travel companion offers personalized itineraries, hidden gems, and local insights for a seamless and memorable journey. Let AI enhance your adventures effortlessly.
        </Text>

        <TouchableOpacity
          style={[styles.button, styles.googleButton]}
          onPress={() => router.push('auth/sign-up/')}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.signInButton]}
          onPress={() => router.push('auth/sign-in/')}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    height: '100%',
    width: '100%',
  },
  innerContainer: {
    backgroundColor: Colors.WHITE,
    marginTop: 0,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    textAlign: 'center',
    color: '#A9A9A9',
    marginTop:10,
    paddingHorizontal:20,
  },
  button: {
    width: '60%',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4, // Adds shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  googleButton: {
    backgroundColor: '#4285F4', // Google blue color
  },
  signInButton: {
    backgroundColor: '#34A853', // Green color for sign in
  },
});
