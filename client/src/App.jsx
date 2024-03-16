import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import BiryaniList from "./pages/BiryaniList";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Cookies from "js-cookie";
import "./App.css";
import ReviewList from "./components/ReviewList";


const App = () => {
  const [places, setPlaces] = useState([]);
  const [username, setUsername] = useState("");

  const x = Cookies.get("usernameCookie");

  const fetchData = () => {
    axios
      .get("https://s48-nammabiryanihub.onrender.com/getBiryaniP")
      .then((response) => {
        setPlaces(response.data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEntityAdded = () => {
    fetchData();
  };

  const handleLogin = (username) => {
    setUsername(username);
  };

  return (
    <div className="app-container">
      <Router>
        <Navbar username={username}  />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-biryanis" element={<BiryaniList />} />
          {/* <Route path="/profile" element={<Profile onEntityAdded={handleEntityAdded} fetchData={fetchData} />} /> */}
          <Route
            path="/profile"
            element={
              x ? (
                <Profile
                  onEntityAdded={handleEntityAdded}
                  fetchData={fetchData}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/reviewList/:something" element={<ReviewList />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
