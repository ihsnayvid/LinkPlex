import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import Login from "./components/Login";
import Profiles from "./components/Profiles";
import Profile from "./components/Profile";
import Comments from "./components/comments";

import './styles/App.scss';

function App() {  
  return (
    <>

    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/createPost" element={<CreatePost/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profiles" element={<Profiles/>}/>
        <Route path="/profile/:email/:name/:photoURL" element={<Profile />} />        
        <Route path="/Comments/:id" element={<Comments />} />        
      </Routes>
    </Router>
    </>    
  );
}

export default App;
