// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR API KEY",
  authDomain: "YOUR DOMAIN",
  databaseURL: "YOUR DB URL",
  projectId: "YOUR ID",
  storageBucket: "YOUR BUCKET ID",
  messagingSenderId: "YOUR SENDER ID",
  appId: "YOUR APP ID",
  measurementId: "YOUR MEASUREMENT ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
export const firestore = getFirestore(app);
