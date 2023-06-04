// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBxaiPTxI31pG5HhrznpJGamPCckd9vWxU",
  authDomain: "wellnessai-35ac8.firebaseapp.com",
  projectId: "wellnessai-35ac8",
  storageBucket: "wellnessai-35ac8.appspot.com",
  messagingSenderId: "1067649554792",
  appId: "1:1067649554792:web:547ef21c59de9ee9649edd",
  measurementId: "G-LN7BTQY8V0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
