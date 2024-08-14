import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import MediDataContext from '../context/MediDataContext'
import { useState} from "react";

export default function RootLayout() {

  const [userData, setUserData]=useState()
  
  return (
    <MediDataContext.Provider value={{userData, setUserData}}>
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
    </MediDataContext.Provider>
  );
}
