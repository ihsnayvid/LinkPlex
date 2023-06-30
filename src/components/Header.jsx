import React from 'react'
import '../styles/header.scss';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <div>
        <nav>
            <h1> Welcome!!</h1>
            <main>
                <Link to = {"/"}> Home </Link>
                <Link to = {"/createPost"}> Create Post </Link>       
                <Link to = {"/login"}> Login / Signup</Link>         
            </main>
        </nav>
    </div>
  )
}

export default Header;