
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBUiWYGKq5N-q0q_2LXTYoR_AebhL9hcSo",
  authDomain: "testingfirebase-25fe3.firebaseapp.com",
  projectId: "testingfirebase-25fe3",
  storageBucket: "testingfirebase-25fe3.appspot.com",
  messagingSenderId: "901857257947",
  appId: "1:901857257947:web:b5e8b99bafcbd052721ffe",
  measurementId: "G-CQFQKDFYFP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();


export const db = getFirestore(app);
export const storage = getStorage(app);
