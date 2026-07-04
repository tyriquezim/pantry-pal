// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHiCirxkcVAGE0jeCFA_ucXJ0Cj93AhTk",
  authDomain: "pantrypal-999ba.firebaseapp.com",
  projectId: "pantrypal-999ba",
  storageBucket: "pantrypal-999ba.firebasestorage.app",
  messagingSenderId: "536003307450",
  appId: "1:536003307450:web:3235469aac5dc970e39f83",
  measurementId: "G-7GE1FKQ878"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);