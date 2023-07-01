import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import Profiles from "./components/Profiles";
import Profile from "./components/Profile";
import { useEffect, useState } from 'react';
import { db } from './config/firebase';
import { getDocs, collection } from 'firebase/firestore';


import './styles/App.scss';

function App() {
  const [allPosts, setAllPosts] = useState([]);

  const getAllPosts = async () => {
    const postsCollectionRef = collection(db, "Post");
    try{
      const data = await getDocs(postsCollectionRef);
      // console.log("counting")
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAllPosts(filteredData);
      // console.log(filteredData);
    }
    catch(err){
      console.log(err.message);
    }
     
  }
  useEffect(() =>{
    // console.log("effect from app");
    getAllPosts();
  }, []);
  return (
    <>

    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/createPost" element={<CreatePost/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/userProfile" element={<UserProfile/>}/>
        <Route path="/profiles" element={<Profiles/>}/>
        {/* <Route path="/profile/:email/:name" element={<Profile/>} /> */}
        <Route path="/profile/:email/:name/:photoURL" element={<Profile />} />        
      </Routes>
    </Router>
    </>    
  );
}

export default App;
