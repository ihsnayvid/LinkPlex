import React from 'react'
import '../styles/header.scss';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useEffect } from 'react';
import { auth } from "../config/firebase";
import img from "../assets/linkplex2.png";
const Header = () => {
  const [logState, setLogState] = useState("Login");
  const [user, loading, error] = useAuthState(auth);
  useEffect(() =>{
    if(!user) setLogState("Login");
    else setLogState("Logout");
  }, [user]);
  return (
    <div >
        <nav>
            <Link to = {"/"}><img src={img} alt="Description of the image" style={{width: "18em", height: "5em", marginTop: "20px"}}/></Link>
            <main>
                <Link to = {"/"}> Home </Link>
                <Link to = {"/profiles"}> Profiles </Link>
                <Link to = {"/createPost"}> Create Post </Link>       
                <Link to = {"/login"}> {logState}</Link>         
            </main>
        </nav>
    </div>
  )
}

export default Header;