import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Animated } from 'react-native';
import tw from 'twrnc';
import { useNavigation, useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../configs/firebase';

export default function Signup() {
  const router = useRouter();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');

  const usernameAnim = useRef(new Animated.Value(0)).current;
  const emailAnim = useRef(new Animated.Value(0)).current;
  const passwordAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  const onCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User signed up:', user);
        router.push('auth/sign-in');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error signing up:', errorCode, errorMessage);
      });
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });

    Animated.stagger(100, [
      Animated.timing(usernameAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(emailAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(passwordAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <View style={tw`flex-1 bg-white`}>
      <Image
        source={require('./../../../assets/images/background1.png')}
        style={{ width: '100%', height: '50%' }}
      />
      <View style={tw`flex-1 justify-center items-center p-4`}>
        <Text style={tw`text-2xl font-bold mb-4`}>Sign Up</Text>
        <Animated.View style={[tw`w-full mb-4`, { opacity: usernameAnim, transform: [{ scale: usernameAnim }] }]}>
          <TextInput
            style={tw`w-full p-3 border border-gray-300 rounded-md`}
            placeholder="Username"
            value={username}
            onChangeText={setUserName}
          />
        </Animated.View>
        <Animated.View style={[tw`w-full mb-4`, { opacity: emailAnim, transform: [{ scale: emailAnim }] }]}>
          <TextInput
            style={tw`w-full p-3 border border-gray-300 rounded-md`}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </Animated.View>
        <Animated.View style={[tw`w-full mb-4`, { opacity: passwordAnim, transform: [{ scale: passwordAnim }] }]}>
          <TextInput
            style={tw`w-full p-3 border border-gray-300 rounded-md`}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </Animated.View>
        <Animated.View style={[tw`w-full`, { opacity: buttonAnim, transform: [{ scale: buttonAnim }] }]}>
          <TouchableOpacity
            style={tw`w-full p-3 bg-blue-500 rounded-md`}
            onPress={onCreateAccount}
          >
            <Text style={tw`text-center text-white text-lg`}>Sign Up</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}
