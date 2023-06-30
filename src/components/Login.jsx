import React from 'react'
import { useState, useEffect } from "react";
// import { useAuthState } from 'firebase-hooks/auth';
import { auth, googleProvider } from "../config/firebase";
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
}
`

const signInWithGoogle = () => {
  try {
    signInWithPopup(auth, googleProvider);
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
  const [isLogged, setIsLogged] = useState(false);
  // useEffect(() => {
  //   const handleClick = () => {
  //     try{
  //       signInWithGoogle();
  //     }
  //     catch(err){
  //       console.log(err.message);
  //     }
  //   };

  //   handleClick();
  // }, []);
  const handleClick = () => {
    try{
      console.log(isLogged);
      if(!isLogged){
        signInWithGoogle();
        setIsLogged(!isLogged);
        console.log("logged in successfully");
      }
      else{
        logout();
        setIsLogged(!isLogged);
        console.log("Logged out successfully");
      }
    }
    catch(err){
      console.log(err.message);
    }
  }
  return (
    <div>
    <SubmitButton onClick={handleClick}> Login with Google</SubmitButton>
    </div>
  )
}

export default Login;