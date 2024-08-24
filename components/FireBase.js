// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyHENPb0pTT7hR7_kaWhcuTC4Ds5XwCr0",
  authDomain: "timesphere-b6efd.firebaseapp.com",
  projectId: "timesphere-b6efd",
  storageBucket: "timesphere-b6efd.appspot.com",
  messagingSenderId: "323181692953",
  appId: "1:323181692953:web:c5cc628508384d7c2a4288"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize FireStore
export const db = getFirestore(app);