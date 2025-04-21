// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB59VUQYyTjQtNApcnC3Q6LYpAn2DxOWYc",
  authDomain: "book-scape-a854e.firebaseapp.com",
  projectId: "book-scape-a854e",
  storageBucket: "book-scape-a854e.firebasestorage.app",
  messagingSenderId: "40776224413",
  appId: "1:40776224413:web:eee3687d6df28b990e8e74",
  measurementId: "G-4KJFP2DX01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);  // Get Firestore instance

// Export the authentication and Firestore instances
export { auth, signInWithEmailAndPassword, db };
