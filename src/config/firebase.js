
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


  // Your web app's Firebase configuration


  const firebaseConfig = {
    apiKey: "AIzaSyCLSmkzuUU0RCnDUzJmM3pnPra9ygP-TFc",
    authDomain: "linkplex-a2973.firebaseapp.com",
    projectId: "linkplex-a2973",
    storageBucket: "linkplex-a2973.appspot.com",
    messagingSenderId: "307261424557",
    appId: "1:307261424557:web:d26235798cf75e5d935724",
    measurementId: "G-T3ZB8LSFGT"
  };
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();


export const db = getFirestore(app);
export const storage = getStorage(app);
