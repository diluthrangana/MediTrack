import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { useRouter, useNavigation } from 'expo-router';
import tw from 'twrnc';
import CreateTripContext from './../../context/CreateTripContext';

export default function SelectTraveller() {
  const navigation = useNavigation()
  const router = useRouter();
  const [selectedTraveller, setSelectedTraveller] = useState(null);
  const { tripData, setTripData } = useContext(CreateTripContext);

  const PressContinueSelectTraveller = () => {
    router.push("/create-trip/select-dates");
  };

  const handleTravellerSelect = (index, title) => {
    setTripData({ ...tripData, traveller: title });
    setSelectedTraveller(index);
  };

  const SelectTravelerList = [
    { id: '1', title: 'Just Me', desc: 'Travel alone and enjoy some personal time.', icon: '', people: '1' },
    { id: '2', title: 'Couple', desc: 'A romantic getaway for two.', icon: '', people: '2' },
    { id: '3', title: 'Family', desc: 'Perfect for a family trip.', icon: '', people: '4' },
    { id: '4', title: 'Friends', desc: 'Fun times with friends.', icon: '', people: '3+' },
  ];

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Select Traveller',
      headerTransparent: true,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={SelectTravelerList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[
                styles.card,
                selectedTraveller === index && styles.selectedCard,
              ]}
              onPress={() => handleTravellerSelect(index, item.title)}
            >
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc}>{item.desc}</Text>
                <Text style={styles.people}>{item.people} people</Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.list}
        />
      </View>

      <View>
        <TouchableOpacity
          style={tw`bg-blue-500 rounded-full py-2 px-4`}
          onPress={PressContinueSelectTraveller}
        >
          <Text style={tw`text-white text-center font-semibold`}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  selectedCard: {
    backgroundColor: '#f0f5ff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  desc: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  people: {
    fontSize: 14,
    color: '#999',
  },
});
