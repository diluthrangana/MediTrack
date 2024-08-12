import { View, Text, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useNavigation } from "expo-router";
import CalendarPicker from "react-native-calendar-picker";
import tw from "twrnc";
import { useRouter } from "expo-router";
import CreateTripContext from './../../context/CreateTripContext';

export default function SelectDates() {
  const navigation = useNavigation();
  const router = useRouter();
  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { tripData, setTripData } = useContext(CreateTripContext);

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear().toString().substr(-2); // Get last two digits of the year
    return `${day}/${month}/${year}`;
  };

  const onDateChange = (date, type) => {
    if (type === 'START_DATE') {
      setStartDate(formatDate(date));
    } else if (type === 'END_DATE') {
      setEndDate(formatDate(date));
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Select Dates",
      headerTransparent: true,
    });
  }, [navigation]);

  const handlePress = () => {
    if (startDate && endDate) {
      setTripData({ ...tripData, startDate, endDate });
    } else if (startDate) {
      setTripData({ ...tripData, startDate });
    } else {
      ToastAndroid.show("Please select a start date", ToastAndroid.LONG);
      return;
    }
    router.push("/create-trip/select-budget");
    
  };

  return (
    <View style={tw`flex-1 items-center`}>
      <View style={{ marginTop: 100 }}>
        <CalendarPicker
          onDateChange={onDateChange}
          allowRangeSelection={true}
          selectedDayColor={'#ADD8E6'}
        />
      </View>
      <View>
        <TouchableOpacity
          style={tw`bg-blue-500 rounded-full py-2 px-4 mt-80`}
          onPress={handlePress}
        >
          <Text style={tw`text-white text-center font-semibold`}>
            Start Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
