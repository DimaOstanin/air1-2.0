

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "airsoft-1.firebaseapp.com",
  projectId: "airsoft-1",
  storageBucket: "airsoft-1.appspot.com",
  messagingSenderId: "729196867950",
  appId: "1:729196867950:web:c3ed3dcf9fb65b49f6517f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);