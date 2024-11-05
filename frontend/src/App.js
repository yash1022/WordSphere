import React, { useState, createContext } from "react";
import Navbar from "./components/Navbar";
import ProfilePage from "./components/Profilepage"
import FeedPage from "./components/FeedPage";
import Fav from "./components/Fav";
import Like from "./components/Like";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faRetweet, faComment } from '@fortawesome/free-solid-svg-icons';
import Createpost from "./components/Createpost";
import Landing from "./components/Landing";
import Readpost from "./components/Readpost";

const authContext = createContext();

function App() {
    const [mode, setMode] = useState("light");
    const [token, setToken] = useState(null);
    const [value, setValue] = useState(false);
    const [User, setUser] = useState(null);

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
          <Route path="/feed" element={<FeedPage/>} />
          <Route path="/create" element={<Createpost/>}/>
          <Route path="/fav" element={<Fav mode={mode} />} />
          <Route path="/liked" element={<Like mode={mode} />} />
          <Route path="/home" element={<Landing mode={mode} />} />
          <Route path="/post" element={<Readpost></Readpost>} />

        </Routes>

      </authContext.Provider>

    </Router>
  </>
  );
   
}

export default App;
export { authContext };
