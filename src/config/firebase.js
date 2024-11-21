import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBfqLmOoKUCSeaukG-Z5ggyJDN3fAMucp8",
  authDomain: "livscyklus-708e3.firebaseapp.com",
  databaseURL: "https://livscyklus-708e3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "livscyklus-708e3",
  storageBucket: "livscyklus-708e3.firebasestorage.app",
  messagingSenderId: "1001634029515",
  appId: "1:1001634029515:web:144e5223e022e5862ce04e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);