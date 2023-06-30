import React from 'react'
import GoogleButton from 'react-google-button'
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
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
  const [isLogged, setIsLogged] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  
  const handleClick = () => {
    try{
      console.log(isLogged);
      if(!user){
        signInWithGoogle();
        // setIsLogged(!isLogged);
        navigate('/');
        console.log("logged in successfully");
      }
      else{
        logout();
        // setIsLogged(!isLogged);
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
      <GoogleButton type="dark" onClick={handleClick} />
    ) : (
      <SubmitButton onClick={handleClick}>Logout</SubmitButton>
    )}
    </div>
  )
}

export default Login;