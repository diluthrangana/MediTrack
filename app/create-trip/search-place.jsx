import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, Text, Pressable, SafeAreaView, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Autocomplete from 'react-native-autocomplete-input';
import tw from 'twrnc';
import { useRouter, useNavigation } from 'expo-router';
import { placesInSriLanka } from './../../data/places';
import CreateTripContext from './../../context/CreateTripContext';
import MapView, { Marker } from 'react-native-maps';

const SearchPlace = () => {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const router = useRouter();
  const navigation = useNavigation()
  const { tripData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Select Traveller',
      headerTransparent: true,
    });
  }, [navigation]);

  const findData = (query) => {
    const regex = new RegExp(`${query.trim()}`, 'i');
    setFilteredData(query === '' ? [] : placesInSriLanka.filter(item => item.name.search(regex) >= 0));
  };

  const handleInputChange = (text) => {
    setQuery(text);
    findData(text); 
  };

  const PressContinueSearchPlace = () => {
    router.push('/create-trip/select-traveller')
    setTripData({ ...tripData, Area: query })
  };

  // Default coordinates for the map
  const mapRegion = {
    latitude: 7.2906, // Example latitude (Kandy)
    longitude: 80.6337, // Example longitude (Kandy)
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={{ flex: 1 }}>
      <MapView
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        region={mapRegion}
      >
        <Marker coordinate={mapRegion} title="Selected Location" description={query} />
      </MapView>
      
      <View style={{ flex: 1, marginTop: 80, paddingHorizontal: 16 }}>
        <Autocomplete
          data={filteredData}
          defaultValue={query}
          onChangeText={handleInputChange}
          placeholder="Enter a place"
          renderTextInput={(props) => (
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 5, padding: 5 }}>
              <MaterialIcons name="search" size={20} style={{ marginRight: 10, paddingLeft: 10 }} />
              <TextInput
                {...props}
                style={{
                  height: 40,
                  borderColor: '#ccc',
                  borderWidth: 0,
                  flex: 1,
                  paddingLeft: 8,
                }}
              />
            </View>
          )}
          flatListProps={{
            keyExtractor: (_, idx) => idx.toString(),
            renderItem: ({ item }) => (
              <Pressable
                onPress={() => {
                  setQuery(item.name);
                  setFilteredData([]);
                }}
                style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', backgroundColor: 'white' }}
              >
                <Text>{item.name}</Text>
              </Pressable>
            ),
          }}
        />

        <View style={{marginBottom:40 }}>
          <TouchableOpacity
            style={tw`bg-blue-500 rounded-full py-2 px-4`}
            onPress={PressContinueSearchPlace}
          >
            <Text style={tw`text-white text-center font-semibold`}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </TouchableWithoutFeedback>
</SafeAreaView>

  );
};

export default SearchPlace;
