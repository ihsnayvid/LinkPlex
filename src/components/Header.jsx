import React from 'react'
import '../styles/header.scss';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useEffect } from 'react';
import { auth } from "../config/firebase";

const Header = () => {
  const [logState, setLogState] = useState("Login");
  const [user, loading, error] = useAuthState(auth);
  useEffect(() =>{
    if(!user) setLogState("Login");
    else setLogState("Logout");
  }, [user]);
  return (
    <div>
        <nav>
            <h1> Welcome!!</h1>
            <main>
                <Link to = {"/"}> Home </Link>
                <Link to = {"/createPost"}> Create Post </Link>       
                <Link to = {"/login"}> {logState}</Link>         
            </main>
        </nav>
    </div>
  )
}

export default Header;