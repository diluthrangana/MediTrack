import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import React, { useContext } from 'react';
import { useRouter } from "expo-router";
import MediDataContext from '../../context/MediDataContext';

export default function FitnessTracking() {
  const router = useRouter();
  const { userData } = useContext(MediDataContext);

  return (
    <View
      style={styles.button}
      onPress={() => router.push('editmyhealth/EditMedication')}
    >   
      <View style={styles.container}>
        {/* Vertical Card */}
        <View style={styles.verticalcard}>
        </View>

        {/* First Horizontal Card */}
        <View style={styles.horizontalcard1}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.carousel}
          >
            {/* Example Images */}
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.carouselImage} />
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.carouselImage} />
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.carouselImage} />
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.carouselImage} />
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.carouselImage} />
          </ScrollView>
        </View>

        {/* Second Horizontal Card */}
        <View style={styles.horizontalcard2}>
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.carousel}
          >
            {/* Example Images */}
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.carouselImage} />
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.carouselImage} />
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.carouselImage} />
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.carouselImage} />
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.carouselImage} />
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  container: {
    position: 'relative',
    height: 200,
  },
  verticalcard: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '25%',
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  horizontalcard1: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '72%',
    height: '47%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carousel: {
    
  },
  carouselImage: {
    width: 70, // Square image
    height: 70,
    borderRadius: 10,
    marginRight: 10,
  },
  horizontalcard2: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '72%',
    height: '47%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
