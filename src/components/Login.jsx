import React from 'react';
import Lottie from 'lottie-react';
import hamster from '../assets/95642-sad-dog.json';
import welcome from '../assets/31548-robot-says-hello.json';
import GoogleButton from 'react-google-button';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
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
import { Button, styled,Box , Typography } from '@mui/material';


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

  
  const handleClick = async () => {
    const userCollectionRef = collection(db, "user");
    try{
      if(!user){
        await signInWithGoogle();
        navigate('/');
        console.log("hello1")
        const { displayName, email, photoURL, uid } = auth.currentUser;
        const userQuerySnapshot = await getDocs(query(userCollectionRef, where('Email', '==', email)));
        
        if (userQuerySnapshot.empty) {
          await addDoc(userCollectionRef, {
            Email: email,
            Name: displayName,
          Profile: photoURL,
        });
        toast.info('New user created', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          toast.success('Signed in Successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
            setTimeout(() => {
              navigate('/');
            }, 3000);

      } else {
        // console.log('User already exists in the database.');
        toast.success('Signed in Successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
          // setTimeout(() => {
          // }, 3000);
      }
        // ---------->ends here
        // console.log("logged in successfully");
      }
      else{
        await logout();        
        toast.info('User Logged out', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        // console.log("Logged out successfully");
      }
    }
    catch(err){
      // console.log(err.message);
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
      <Box style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '100px'
      }}>
        <Lottie animationData={welcome} />
        <GoogleButton style={{ marginTop: "-10px" }} type="dark" onClick={handleClick} />
      </Box>
      
    ) : (
      <Box style={{
        display:'flex',
        flexDirection:'column',
        marginTop:'15vh',
        alignItems:'center',
        justifyContent:'center',
        gap:'3vh'
      }}>
      <Typography variant="h4">Log out?</Typography>
      <Typography variant="h6">Are you sure you want to log out of your account?</Typography>
      <SubmitButton  onClick={handleClick}>Logout</SubmitButton>
      <Lottie style={{width:"300px"}} animationData={hamster}/>
      </Box>
    )}
    <ToastContainer />
    </div>
  )
}

export default Login;