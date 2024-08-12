import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Animated } from 'react-native';
import tw from 'twrnc';
import { useNavigation, useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../configs/firebase';

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const emailAnim = useRef(new Animated.Value(0)).current;
  const passwordAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  const onSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User signed in:', user);
        router.push('/myhealth');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error signing in:', errorCode, errorMessage);
      });
  };

  useEffect(() => {
    navigation.setOptions({});
    
    Animated.stagger(100, [
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
    <View style={tw`flex-1 bg-white `}>
      <Image
        source={require('./../../../assets/images/background1.png')}
        style={{ width: '100%', height: '50%' }}
      />
      <View style={tw`flex-1 justify-center items-center p-4 bg-transparent`}>
        <Text style={tw`text-2xl font-bold mb-4`}>Login</Text>
        <Animated.View style={[tw`w-full mb-4`, { opacity: emailAnim, transform: [{ scale: emailAnim }] }]}>
          <TextInput
            style={tw`w-full p-3 border border-gray-300 rounded-md`}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
          />
        </Animated.View>
        <Animated.View style={[tw`w-full mb-4`, { opacity: passwordAnim, transform: [{ scale: passwordAnim }] }]}>
          <TextInput
            style={tw`w-full p-3 border border-gray-300 rounded-md`}
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
          />
        </Animated.View>
        <Animated.View style={[tw`w-full`, { opacity: buttonAnim, transform: [{ scale: buttonAnim }] }]}>
          <TouchableOpacity onPress={onSignIn} style={tw`w-full p-3 bg-blue-500 rounded-md`}>
            <Text style={tw`text-center text-white text-lg`}>Login</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}
