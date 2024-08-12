import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { useRouter, useNavigation } from 'expo-router';
import tw from 'twrnc';
import CreateTripContext from './../../context/CreateTripContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function SelectBudget() {
  const navigation = useNavigation();
  const router = useRouter();
  const [selectedBudget, setSelectedBudget] = useState(null);
  const { tripData, setTripData } = useContext(CreateTripContext);

  const selectBudgetList = [
    { title: 'Budget', amount: '10000', desc: 'Description for budget 1', icon: 'attach-money' },
    { title: 'Comfort', amount: '50000', desc: 'Description for budget 2', icon: 'star-rate' },
    { title: 'Luxury', amount: '100000', desc: 'Description for budget 3', icon: 'grade' },
  ];

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Select Budget',
      headerTransparent: true,
    });
  }, [navigation]);

  const PressContinueSelectBudget = () => {
    router.push('/create-trip/review-trip')
    console.log(tripData);
  };

  const handleBudgetSelect = (amount, index) => {
    setTripData({ ...tripData, budget: amount });
    setSelectedBudget(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={selectBudgetList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              styles.card,
              selectedBudget === index && styles.selectedCard,
            ]}
            onPress={() => handleBudgetSelect(item.amount, index)}
          >
            <View style={styles.cardContent}>
              <View style={styles.textContainer}>
                <Text style={[styles.title, selectedBudget === index && styles.selectedCardTitle]}>{item.title}</Text>
                <Text style={styles.desc}>{item.desc}</Text>
                <Text style={styles.amount}>{item.amount}</Text>
              </View>
              <MaterialIcons name={item.icon} size={50} color={selectedBudget === index ? '#0056b3' : '#666'} style={styles.icon} />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
      />
      <View style={{ marginTop: 150 }}>
        <TouchableOpacity
          style={tw`bg-blue-500 rounded-full py-2 px-4`}
          onPress={PressContinueSelectBudget}
        >
          <Text style={tw`text-white text-center font-semibold`}>Start Now</Text>
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
  selectedCardTitle: {
    fontSize: 20,
    color: '#666666',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666666',
  },
  desc: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  amount: {
    fontSize: 14,
    color: '#999',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  icon: {
    marginLeft: 10,
    opacity:0.5
  },
});
