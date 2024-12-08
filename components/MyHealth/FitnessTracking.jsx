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
import DietData from "../../data/DietPlans"; // Import diet data

export default function FitnessTracking() {
  const router = useRouter();
  const { userData } = useContext(MediDataContext);

  const [bmiCategoryWorkout, setBMICategoryWorkout] = useState([]);
  const [bmiCategoryDiet, setBMICategoryDiet] = useState([]);
  const [currentDayWorkout, setCurrentDayWorkout] = useState([]);
  const [currentDayDiet, setCurrentDayDiet] = useState([]);

  useEffect(() => {
    // Calculate BMI and determine workout & diet category
    const calculateBMI = (weight, height) => {
      const heightInMeters = height / 100; // Convert cm to meters
      return (weight / (heightInMeters * heightInMeters)).toFixed(2);
    };

    if (userData?.weight && userData?.height) {
      const bmi = calculateBMI(userData.weight, userData.height);

      // Determine Workout BMI Category
      if (bmi < 18.5) {
        setBMICategoryWorkout(WorkoutData["Underweight"]);
        setBMICategoryDiet(DietData["Underweight"]);
      } else if (bmi >= 18.5 && bmi < 24.9) {
        setBMICategoryWorkout(WorkoutData["Healthy Weight"]);
        setBMICategoryDiet(DietData["Healthy Weight"]);
      } else if (bmi >= 25 && bmi < 29.9) {
        setBMICategoryWorkout(WorkoutData["Overweight"]);
        setBMICategoryDiet(DietData["Overweight"]);
      } else if (bmi >= 30) {
        setBMICategoryWorkout(WorkoutData["Obese"]);
        setBMICategoryDiet(DietData["Obese"]);
      }
    }
  }, [userData]);

  useEffect(() => {
    const getCurrentDayWorkout = () => {
      const today = new Date().getDay(); 
      setCurrentDayWorkout(bmiCategoryWorkout[today]?.workouts || []);
    };

    getCurrentDayWorkout();
  }, [bmiCategoryWorkout]);

  useEffect(() => {
    const getCurrentDayDiet = () => {
      const today = new Date().getDay();
      setCurrentDayDiet(bmiCategoryDiet[today] || []); // Directly use today's data
    };
  
    getCurrentDayDiet();
  }, [bmiCategoryDiet]);
  

  return (
    <View style={styles.button}>
      <View style={styles.container}>
        {/* Vertical Card */}
        <View style={styles.verticalcard}></View>

        {/* First Horizontal Card (Diet Plan) */}
        <View style={styles.horizontalcard1}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.carousel}
          >
            {currentDayDiet?.map((item, index) => (
              <View key={index} style={styles.dietContainer}>
                <Image source={item.image} style={styles.image} />
                {/* <Text style={styles.dietText}>{item.meal}</Text>
                <Text style={styles.dietDetails}>{item.calories} cal</Text> */}
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Second Horizontal Card (Workout Plan) */}
        <View style={styles.horizontalcard2}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.carousel}
          >
            {currentDayWorkout?.map((item, index) => (
              <View key={index} style={styles.workoutContainer}>
                <Image source={item.image} style={styles.image} />
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
    height: 250,
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
  },
  carousel: {},
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 10,
  },
  dietContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  dietText: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
  },
  dietDetails: {
    fontSize: 10,
    color: 'gray',
  },
  workoutContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
