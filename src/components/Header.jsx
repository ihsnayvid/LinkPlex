import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import img from '../assets/linkplex2.png';
import '../styles/header.scss';

const Header = () => {
  const [logState, setLogState] = useState('Login');
  const [user, loading, error] = useAuthState(auth);
  
  useEffect(() => {
    if (!user) {
      setLogState('Login');
    } else {
      setLogState('Logout');
    }
  }, [user]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav>
        <Link to="/">
          <img src={img} alt="Description of the image" style={{ width: '18em', height: '5em', marginTop: '20px' }} />
        </Link>
        <div className={`burger-menu ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`menu ${isMenuOpen ? 'show' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/profiles">Profiles</Link>
          <Link to="/createPost">Create Post</Link>
          <Link to="/login">{logState}</Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
