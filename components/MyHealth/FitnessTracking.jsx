import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import MediDataContext from "../../context/MediDataContext";
import WorkoutData from "../../data/WorkoutPlans";

export default function FitnessTracking() {
  const router = useRouter();
  const { userData } = useContext(MediDataContext);
  const [bmiCategory, setBMICategory] = useState([]);
  const [currentDayWorkout, setCurrentDayWorkout] = useState([]);

  useEffect(() => {
    // Calculate BMI and determine category
    const calculateBMI = (weight, height) => {
      const heightInMeters = height / 100; // Convert cm to meters
      return (weight / (heightInMeters * heightInMeters)).toFixed(2);
    };

    if (userData?.weight && userData?.height) {
      const bmi = calculateBMI(userData.weight, userData.height);

      // Determine BMI category
      if (bmi < 18.5) setBMICategory(WorkoutData["Underweight"]);
      else if (bmi >= 18.5 && bmi < 24.9)
        setBMICategory(WorkoutData["Healthy Weight"]);
      else if (bmi >= 25 && bmi < 29.9)
        setBMICategory(WorkoutData["Overweight"]);
      else if (bmi >= 30) setBMICategory(WorkoutData["Obese"]);
    }
  }, [userData]);

  useEffect(() => {
    // Determine current day's workout plan dynamically
    const getCurrentDayWorkout = () => {
      const today = new Date().getDay(); // Get the current day of the week
      console.log("Today's index:", today);
      console.log("Today's workouts from BMI Category:", bmiCategory[today]);
      setCurrentDayWorkout(bmiCategory[today]?.workouts || []);
    };

    getCurrentDayWorkout();
  }, [bmiCategory]);

  return (
    <View style={styles.button}>
      <View style={styles.container}>
        {/* Vertical Card */}
        <View style={styles.verticalcard}></View>

        {/* First Horizontal Card */}
        <View style={styles.horizontalcard1}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.carousel}
          >
            <Image
              source={{ uri: "https://via.placeholder.com/100" }}
              style={styles.carouselImage}
            />
            <Image
              source={{ uri: "https://via.placeholder.com/100" }}
              style={styles.carouselImage}
            />
            <Image
              source={{ uri: "https://via.placeholder.com/100" }}
              style={styles.carouselImage}
            />
          </ScrollView>
        </View>

        {/* Second Horizontal Card - Dynamically Updated with Today's Workout */}
        <View style={styles.horizontalcard2}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.carousel}
          >
            {currentDayWorkout?.map((item, index) => (
              <View key={index} style={styles.workoutContainer}>
                <Image
                  source={item.image} // Fallback to placeholder
                  style={styles.image}
                />
                {/* <Text style={styles.workoutText}>{item.exercise}</Text>
                <Text style={styles.workoutDetails}>
                  {item.sets
                    ? `${item.sets} sets x ${item.reps || ""} reps`
                    : ""}
                </Text> */}
              </View>
            ))}
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
    elevation: 2,
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
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carousel: {},
  carouselImage: {
    width: 70,
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
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 10,
  }
});
 

