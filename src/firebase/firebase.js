// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA24SLdKfcZto3deVtIz82OF7pMYKkCFRI",
  authDomain: "tweetfortweet-f16fc.firebaseapp.com",
  databaseURL: "https://tweetfortweet-f16fc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tweetfortweet-f16fc",
  storageBucket: "tweetfortweet-f16fc.appspot.com",
  messagingSenderId: "493259706372",
  appId: "1:493259706372:web:751dacd78ac44312a6e551",
  measurementId: "G-8HPBYBNBN9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
export const firestore = getFirestore(app);