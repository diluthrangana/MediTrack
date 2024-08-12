
const apiKey = 'AIzaSyDWC2mlyhJmXxvfbd_pX4AUnlCrA-yPBQw'
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

//const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set in the environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);


const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

const chatSession = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {text: "I am in Sri Lanka and need to generate a detailed travel plan for the undefined area in Sri Lanka for Couple travelers, starting from undefined until undefined. The budget for this trip is 50000 Rs.\n\n        Please provide a comprehensive plan that includes:\n\n        Places to visit in the undefined area, along with photo links for each place.\n        Activities to do at each location, including the cost of each activity and ticket prices.\n        Hotels to stay in for Couple travelers, with prices, addresses, and photo links for each hotel.\n        A well-managed itinerary to make the most of the available time within the budget of 50000 Rs.\n        Please provide this information in JSON format."},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "I can help you create a travel plan, but I need some more information from you to make it truly relevant and useful:\n\n1. **Where in Sri Lanka are you starting from?** (e.g., Colombo, Kandy, etc.)\n2. **Where do you want to go?** (e.g., hill country, beaches, cultural sites, etc.)\n3. **What are your interests?** (e.g., adventure, relaxation, history, culture, etc.)\n4. **How long is your trip?** (e.g., 3 days, 5 days, 1 week, etc.)\n5. **What type of accommodation do you prefer?** (e.g., budget, mid-range, luxury)\n6. **What are your transportation preferences?** (e.g., bus, train, car, tuk-tuk, etc.)\n\nOnce you provide these details, I can generate a comprehensive JSON travel plan tailored to your preferences and budget.\n\n**Example of JSON format:**\n\n```json\n{\n  \"trip_details\": {\n    \"start_location\": \"Colombo\",\n    \"destination\": \"Hill Country\",\n    \"duration\": \"5 days\",\n    \"budget\": \"50000 Rs\",\n    \"interests\": [\"nature\", \"culture\", \"adventure\"]\n  },\n  \"itinerary\": [\n    {\n      \"day\": 1,\n      \"location\": \"Kandy\",\n      \"activities\": [\n        {\n          \"name\": \"Visit Temple of the Tooth\",\n          \"cost\": \"500 Rs\",\n          \"description\": \"One of the most sacred Buddhist temples in Sri Lanka.\",\n          \"photo_link\": \"https://example.com/temple-photo.jpg\"\n        },\n        {\n          \"name\": \"Attend a cultural show\",\n          \"cost\": \"1000 Rs\",\n          \"description\": \"Enjoy traditional Sri Lankan dancing and music.\",\n          \"photo_link\": \"https://example.com/cultural-show.jpg\"\n        }\n      ],\n      \"hotel\": {\n        \"name\": \"Hotel X\",\n        \"price\": \"2000 Rs\",\n        \"address\": \"123 Main Street, Kandy\",\n        \"photo_link\": \"https://example.com/hotel-photo.jpg\"\n      }\n    },\n    {\n      \"day\": 2,\n      \"location\": \"Nuwara Eliya\",\n      \"activities\": [\n        {\n          \"name\": \"Hike to Gregory Lake\",\n          \"cost\": \"Free\",\n          \"description\": \"Enjoy stunning views of the lake and surrounding mountains.\",\n          \"photo_link\": \"https://example.com/gregory-lake.jpg\"\n        },\n        {\n          \"name\": \"Visit a tea plantation\",\n          \"cost\": \"500 Rs\",\n          \"description\": \"Learn about the tea production process and enjoy a cup of Ceylon tea.\",\n          \"photo_link\": \"https://example.com/tea-plantation.jpg\"\n        }\n      ],\n      \"hotel\": {\n        \"name\": \"Hotel Y\",\n        \"price\": \"1500 Rs\",\n        \"address\": \"456 Hill Road, Nuwara Eliya\",\n        \"photo_link\": \"https://example.com/hotel-photo.jpg\"\n      }\n    }\n  ]\n}\n```\n\nI am ready to help you create a detailed and personalized travel plan once you provide me with the necessary information. 😊 \n"},
      ],
    },
  ],
});

module.exports = chatSession;
