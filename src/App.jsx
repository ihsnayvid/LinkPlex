
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import Login from "./components/Login";

import './styles/App.scss';

function App() {
  return (
    <>
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/createPost" element={<CreatePost/>}/>
        <Route path="/login" element={<Login/>} />
      </Routes>
    </Router>
    </>    
  );
}

export default App;
