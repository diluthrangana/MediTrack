import { View, Text } from 'react-native'
import React from 'react'
import ProfileCard from "../../components/Profile/ProfileCard"
import ProfileDetails from "../../components/Profile/ProfileDetails"


export default function profile() {
  return (
    <View>
      <ProfileCard/>
      <ProfileDetails/>
    </View>
  )
}