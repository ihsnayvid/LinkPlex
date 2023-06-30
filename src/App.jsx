import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import { useEffect, useState } from 'react';
import { db } from './config/firebase';
import { getDocs, collection } from 'firebase/firestore';


import './styles/App.scss';

function App() {
  const [allPosts, setAllPosts] = useState([]);

  const postsCollectionRef = collection(db, "Post");
  useEffect(() =>{
    const getAllPosts = async () => {

      try{
        const data = await getDocs(postsCollectionRef);
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
    getAllPosts();
  }, []);
  return (
    <>

    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home data={allPosts}/>}/>
        <Route path="/createPost" element={<CreatePost/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/userProfile" element={<UserProfile/>} />
      </Routes>
    </Router>
    </>    
  );
}

export default App;
