import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDi4vEeOcevTXPATWrltUbahDy-zy9nI7s",
    authDomain: "react-webapp-netflix.firebaseapp.com",
    projectId: "react-webapp-netflix",
    storageBucket: "react-webapp-netflix.appspot.com",
    messagingSenderId: "204098886194",
    appId: "1:204098886194:web:53fa1bedafc6d54477fa2b",
    measurementId: "G-L9N6P4Y43V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
