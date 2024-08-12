import { View, Text } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "expo-router";
import tw from "twrnc";
import LottieView from "lottie-react-native";
import CreateTripContext from "./../../context/CreateTripContext";
import chatSession from "./../../configs/gemini";
import { auth, db } from "./../../configs/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function GenerateTrip() {
  const { tripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    const GenerateAITrip = async () => {
      setLoading(true);
      try {
        const AI_COMMAND = `I am in Sri Lanka and need to generate a detailed travel plan for the ${tripData.Area} area in Sri Lanka for ${tripData.traveller} travelers, starting from ${tripData.startDate} until ${tripData.endDate}. The budget for this trip is ${tripData.budget} Rs.

        Please provide a comprehensive plan that includes:

        Places to visit in the ${tripData.Area} area, along with photo links(i need one good photo link,not google search link,it must be possible to open the picture externally) for each place.
        Activities to do at each location, including the cost of each activity and ticket prices.
        Hotels to stay in for ${tripData.traveller} travelers, with prices, addresses and link of a photo(i need one good photo link,not google search link,it must be possible to open the picture externally) for each hotel.
        A well-managed itinerary to make the most of the available time within the budget of ${tripData.budget} Rs.
        Please provide this information in completely JSON format and as very simple.(i have to JSON.parse so give as completely json)`;

        //const AI_COMMAND = `give indian languages and religious like language:english,hindi and religious:hindu,islam.in json format`

        console.log(AI_COMMAND);

        const result = await chatSession.sendMessage(AI_COMMAND);
        console.log(result.response.text())
        const tripResp = JSON.parse(result.response.text());
        console.log(result.response.text())
        /*const tripResp = {
            "userT": [
              {
                "docId": "1722672516472",
                "tripData": {
                  "Area": "Kandy",
                  "traveller": "Just Me",
                  "startDate": "21/08/24",
                  "endDate": "22/08/24",
                  "budget": "600000"
                },
                "tripPlan": {
                  "itinerary": [
                    {
                      "day": "Day 1",
                      "activities": [
                        {
                          "name": "Visit Temple of the Tooth",
                          "cost": "1500 Rs"
                        },
                        {
                          "name": "Kandy Lake Walk",
                          "cost": "500 Rs"
                        }
                      ]
                    },
                    {
                      "day": "Day 2",
                      "activities": [
                        {
                          "name": "Hiking in Knuckles Range",
                          "cost": "3000 Rs"
                        },
                        {
                          "name": "Peradeniya Botanical Gardens",
                          "cost": "1000 Rs"
                        }
                      ]
                    }
                  ],
                  "trip_details": {
                    "budget": "100000 Rs",
                    "destination": "Kandy Area",
                    "duration": "2 days",
                    "interests": ["hiking", "sightseeing"],
                    "start_location": "Kandy"
                  }
                },
                "userEmail": "diluthranganajayasri@gmail.com"
              },
              {
                "docId": "1722672516473",
                "tripData": {
                  "Area": "Colombo",
                  "traveller": "Family",
                  "startDate": "15/09/24",
                  "endDate": "17/09/24",
                  "budget": "200000"
                },
                "tripPlan": {
                  "itinerary": [
                    {
                      "day": "Day 1",
                      "activities": [
                        {
                          "name": "Colombo City Tour",
                          "cost": "4000 Rs"
                        },
                        {
                          "name": "Galle Face Green",
                          "cost": "200 Rs"
                        }
                      ]
                    },
                    {
                      "day": "Day 2",
                      "activities": [
                        {
                          "name": "Mount Lavinia Beach",
                          "cost": "1000 Rs"
                        }
                      ]
                    },
                    {
                      "day": "Day 3",
                      "activities": [
                        {
                          "name": "National Museum",
                          "cost": "600 Rs"
                        }
                      ]
                    }
                  ],
                  "trip_details": {
                    "budget": "200000 Rs",
                    "destination": "Colombo Area",
                    "duration": "3 days",
                    "interests": ["history", "beaches"],
                    "start_location": "Colombo"
                  }
                },
                "userEmail": "janedoe@example.com"
              }
            ]
          }*/
                  

        const docId = Date.now().toString();
        await setDoc(doc(db, "UserTrips", docId), {
          userEmail: user.email,
          tripPlan: tripResp,
          tripData: tripData,
          docId:docId
        });

        router.push("(tabs)/mytrip");
        console.log(tripResp);
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
        setLoading(false);
      }
    };

    GenerateAITrip();
  }, []);

  return (
    <View style={tw`flex-1 justify-center items-center`}>
      {loading ? (
        <LottieView
          source={require("./../../assets/images/loading.json")}
          autoPlay
          loop
          style={{ width: 400, height: 400 }}
        />
      ) : (
        <Text style={tw`text-lg`}>Generate Trip</Text>
      )}
    </View>
  );
}
