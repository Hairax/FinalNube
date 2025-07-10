// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import * as firebaseui from "firebaseui";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjOx-M4GddarBEMiXGoOf0dQIH7Vp6Xyg",
  authDomain: "finalnube-3a6db.firebaseapp.com",
  projectId: "finalnube-3a6db",
  storageBucket: "finalnube-3a6db.firebasestorage.app",
  messagingSenderId: "313692863480",
  appId: "1:313692863480:web:266fc0f15338445c47740d",
  measurementId: "G-M9FX6Q3NPG",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const firebaseAuth = getAuth(app);
export const ui = new firebaseui.auth.AuthUI(firebaseAuth);
export const firebaseDb = getFirestore(app);
