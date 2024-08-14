import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, AppState } from 'react-native';
import Login from './Login';
import { Redirect, useRouter } from 'expo-router';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./../configs/firebase";
import MediDataContext from '../context/MediDataContext';

export default function Index() {
  const user = auth.currentUser;
  const router = useRouter();
  const { userData, setUserData } = useContext(MediDataContext)

 

  return (
    <View style={{ flex: 1 }}>
      {user? <Redirect href={'/mytrip'}/>:<Login/>}
    </View>
  );
}
