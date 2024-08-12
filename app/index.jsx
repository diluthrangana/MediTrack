import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './Login';
import { auth } from '../configs/firebase';
import { Redirect, useRouter } from 'expo-router';

export default function Index() {
  const user = auth.currentUser;
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      {user? <Redirect href={'/mytrip'}/>:<Login/>}
    </View>
  );
}
