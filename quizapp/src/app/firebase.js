import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyDNNdpOZLhVZmWb5c_sthXFFvYFxE59qYM",
    authDomain: "quiz-together-e3ce5.firebaseapp.com",
    projectId: "quiz-together-e3ce5",
    storageBucket: "quiz-together-e3ce5.firebasestorage.app",
    messagingSenderId: "866518390485",
    appId: "1:866518390485:web:8325fac1709bfffe64745c",
    measurementId: "G-NX38CS95EQ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);