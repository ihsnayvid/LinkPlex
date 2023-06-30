import React from 'react'
import GoogleButton from 'react-google-button'
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, googleProvider } from "../config/firebase";
import { db } from '../config/firebase';
import { collection, doc, getDoc, setDoc, addDoc, getDocs, query, where } from 'firebase/firestore';

import {
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { Button, styled } from '@mui/material';


const SubmitButton = styled(Button)`
  display: inline-block;
  padding: 8px 16px;
  border: 2px solid #fff;
  background-color: #222;
  color: #fff;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;
  &: hover{
    background-color: #fff;
  color: #222;
  }
`
const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (err) {
    console.error(err);
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error(err);
  }
};



const Login = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const userCollectionRef = collection(db, "user");
  
  const handleClick = async () => {
    try{
      if(!user){
        await signInWithGoogle();
        
        //ADDING NEW USER TO DB

        // Get the user details from the current user
        const { displayName, email, photoURL, uid } = auth.currentUser;


          // ------>starts here
        // Check if the user already exists in the 'users' collection
      const userQuerySnapshot = await getDocs(query(userCollectionRef, where('Email', '==', email)));

      if (userQuerySnapshot.empty) {
        // User is new, add the user details to the 'users' collection
        await addDoc(userCollectionRef, {
          Email: email,
          Name: displayName,
          Profile: photoURL,
        });

        console.log('User added to Firestore collection.');
      } else {
        console.log('User already exists in the database.');
      }
        // ---------->ends here

        navigate('/');
        console.log("logged in successfully");
      }
      else{
        logout();        
        navigate('/');
        console.log("Logged out successfully");
      }
    }
    catch(err){
      console.log(err.message);
    }
  }
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '50'
    }}>

      
    {!user ? (
      <GoogleButton style={{marginTop:"100px"}} type="dark" onClick={handleClick} />
    ) : (
      <SubmitButton style={{marginTop:"100px"}} onClick={handleClick}>Logout</SubmitButton>
    )}
    </div>
  )
}

export default Login;