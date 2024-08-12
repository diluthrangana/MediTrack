import { View, Text, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import StartNewTripCard from '../../components/MyHealth/StartNewTripCard';
import UserTripList from '../../components/MyHealth/UserTripList';
import tw from 'twrnc';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from "../../configs/firebase";
import { ActivityIndicator } from '@react-native-material/core';

export default function MyTrip() {
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      GetMyTrips();
    }
  }, [user]);

  useEffect(() => {
    console.log("Current userTrips data: ", userTrips);
  }, [userTrips]);

  const GetMyTrips = async () => {
    setLoading(true);
    setUserTrips([]);

    try {
      const query1 = query(collection(db, "UserTrips"), where('userEmail', '==', user?.email));
      const querySnapshot = await getDocs(query1);

      const trips = [];
      querySnapshot.forEach((doc) => {
        // Convert data to JSON format and store it
        const tripData = doc.data();
        trips.push({
          ...tripData,
          // Optionally add docId or other metadata here
          docId: doc.id,
        });
      });

      // Set state with formatted data
      setUserTrips(trips);
    } catch (error) {
      console.error("Error fetching user trips: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={tw`flex-1`}>
      {loading && <ActivityIndicator size={'large'} />}
      <View>
        {userTrips?.length === 0 ? (
          <>
            <View style={tw`items-center mt-4`}>
              <Image
                source={require('./../../assets/images/travel1.png')}
                style={[tw`w-full h-100 mt-4`, { transform: [{ scale: 0.9 }], opacity: 0.7 }]}
                resizeMode="contain"
              />
            </View>
            <View style={tw`mt-2`}>
              <StartNewTripCard />
            </View>
          </>
        ) : (
          <>
            <View> 
              <StartNewTripCard />
            </View>
            <View style={{marginBottom:400}}>
            <UserTripList userTrips={userTrips}  />
            </View>
          </>
        )}
      </View>
    </View>
  );
}
