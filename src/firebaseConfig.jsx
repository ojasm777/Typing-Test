// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyAMZuGbrkEvGlz38z0r9Il_Ogtm4OD5ig4",
//   authDomain: "typingtest-website.firebaseapp.com",
//   projectId: "typingtest-website",
//   storageBucket: "typingtest-website.firebasestorage.app",
//   messagingSenderId: "246009890683",
//   appId: "1:246009890683:web:6d3fc821139d8ae4b05fde",
//   measurementId: "G-C4XZNEELS8"
// };

// const firebaseApp = firebase.initializeApp(firebaseConfig); // This is how we initialize our firebase application
// const auth = firebase.auth();
// const db = firebaseApp.firestore();

// export { auth, db }; // will be used throughout our project
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 

// Firebase configuration from .env 


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Auth and Firestore
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db }; // These will be used throughout your project
