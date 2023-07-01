
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyAVZOa6LevBCk1vS7M018-XFsx831JY5U0",
//   authDomain: "link-it-4521c.firebaseapp.com",
//   projectId: "link-it-4521c",
//   storageBucket: "link-it-4521c.appspot.com",
//   messagingSenderId: "873902486197",
//   appId: "1:873902486197:web:d346b73ebf59afb53d44fc",
//   measurementId: "G-MQWDM6JKR0"
// };
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
