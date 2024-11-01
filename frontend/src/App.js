import React, { useState, createContext } from "react";
import Navbar from "./components/Navbar";
// import ProfilePage from "./components/ProfilePage"; // Ensure this path is correct
// import FeedPage from "./components/FeedPage"; // Ensure this path is correct
import ProfilePage from "./components/Profilepage";
import FeedPage from "./components/FeedPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faRetweet, faComment } from '@fortawesome/free-solid-svg-icons';


const authContext=createContext();



function App() {
  const [mode, setMode] = useState("light");
  const [token,setToken]= useState(null);
  const [value,setValue]=useState(false);
  const [User,setUser]= useState(null);

  const toggleMode = () => {
    if (mode === "dark") {
      setMode("light");
      document.body.style.backgroundColor = "white";
    } else {
      setMode("dark");
      document.body.style.backgroundColor = "black";
    }
  };

  return (
  <>
    <Router>
      <authContext.Provider value={{token,setToken,value,setValue,User,setUser}}>

          <Navbar mode={mode} toggleMode={toggleMode} />
        <Routes>

          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/feed" element={<FeedPage />} />

        </Routes>

      </authContext.Provider>

    </Router>
  </>
  );
}

export default App;
export {authContext};
