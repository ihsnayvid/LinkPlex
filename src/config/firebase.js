
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVZOa6LevBCk1vS7M018-XFsx831JY5U0",
  authDomain: "link-it-4521c.firebaseapp.com",
  projectId: "link-it-4521c",
  storageBucket: "link-it-4521c.appspot.com",
  messagingSenderId: "873902486197",
  appId: "1:873902486197:web:d346b73ebf59afb53d44fc",
  measurementId: "G-MQWDM6JKR0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
