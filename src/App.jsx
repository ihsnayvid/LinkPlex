import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import Login from "./components/Login";
import { useEffect, useState } from 'react';
import { db } from './config/firebase';
import { getDocs, collection } from 'firebase/firestore';


import './styles/App.scss';


const arr = [
  {
    username: "rahul",
    userImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
    Title: "rahul",
    Links: [
      { name: "facebook", link: "facebook.com" },
      { name: "Twitter", link: "Twitter.com" },
      { name: "Twitter", link: "Twitter.com" },
      { name: "Twitter", link: "Twitter.com" },
      { name: "Twitter", link: "Twitter.com" },
      
    ],
    Tags: ["cartoon", "coding"],
    Discription: "hello how are you I am fine",
    Time: "2019-07-07T18:30:00.000Z"
  },
  {
    username: "poddar",
    userImage:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
    Title: "halwai",
    Links: [
      { name: "facebook", link: "facebook.com" },
      { name: "Twitter", link: "Twitter.com" }
    ],
    Tags: ["cartoon", "coding"],
    Discription: "hello how are you I am fine",
    Time: "2021-07-07T18:30:00.000Z"
  },
  {
    username: "Gobar",
    userImage:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
    Title: "kutta",
    Links: [
      { name: "facebook", link: "facebook.com" },
      { name: "Twitter", link: "Twitter.com" }
    ],
    Tags: ["website", "coding"],
    Discription: "hello how are you I am fine",
    Time: "2020-07-07T18:30:00.000Z"
  }
];
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
        console.log(filteredData);
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
        <Route path="/" element={<Home data={arr}/>}/>
        <Route path="/createPost" element={<CreatePost/>}/>
        <Route path="/login" element={<Login/>} />
      </Routes>
    </Router>
    </>    
  );
}

export default App;
