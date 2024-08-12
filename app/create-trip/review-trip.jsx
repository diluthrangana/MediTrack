import { View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import React, { useEffect, useContext } from 'react';
import { useRouter, useNavigation } from 'expo-router';
import tw from 'twrnc';
import CreateTripContext from './../../context/CreateTripContext';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

export default function ReviewTrip() {
  const navigation = useNavigation();
  const router = useRouter();
  const { tripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Review Trip',
      headerTransparent: true,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={tw`flex-1 bg-white p-6`}>
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-2xl font-bold mb-6`}>Review Your Trip Details</Text>
        
        <View style={tw`w-full bg-gray-100 p-6 rounded-lg shadow-md`}>
          <View style={tw`flex-row items-center mb-4`}>
            <FontAwesome name="dollar" size={24} color="#4A90E2" style={tw`mr-3`} />
            <Text style={tw`text-lg`}><Text style={tw`font-semibold`}>Budget:</Text> {tripData.budget}</Text>
          </View>
          <View style={tw`flex-row items-center mb-4`}>
            <MaterialIcons name="people" size={24} color="#4A90E2" style={tw`mr-3`} />
            <Text style={tw`text-lg`}><Text style={tw`font-semibold`}>Traveller:</Text> {tripData.traveller}</Text>
          </View>
          <View style={tw`flex-row items-center mb-4`}>
            <MaterialIcons name="calendar-today" size={24} color="#4A90E2" style={tw`mr-3`} />
            <Text style={tw`text-lg`}><Text style={tw`font-semibold`}>Start Date:</Text> {tripData.startDate}</Text>
          </View>
          <View style={tw`flex-row items-center mb-4`}>
            <MaterialIcons name="calendar-today" size={24} color="#4A90E2" style={tw`mr-3`} />
            <Text style={tw`text-lg`}><Text style={tw`font-semibold`}>End Date:</Text> {tripData.endDate}</Text>
          </View>
          <View style={tw`flex-row items-center`}>
            <FontAwesome name="map-marker" size={24} color="#4A90E2" style={tw`mr-3`} />
            <Text style={tw`text-lg`}><Text style={tw`font-semibold`}>Area:</Text> {tripData.Area}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={tw`bg-blue-500 rounded-full py-3 px-8 mt-6 shadow-lg`}
          onPress={() => router.push('/create-trip/generate-trip')}
        >
          <Text style={tw`text-white text-lg font-semibold`}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
