// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7Mg5psxV7TEChgn40hLIDke-55qEiaJs",
  authDomain: "meditrack-5567e.firebaseapp.com",
  projectId: "meditrack-5567e",
  storageBucket: "meditrack-5567e.appspot.com",
  messagingSenderId: "913428346169",
  appId: "1:913428346169:web:9bef36d4e30aba8d89e4e8",
  measurementId: "G-G9T5BDB36J"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db= getFirestore(app)