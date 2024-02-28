// Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = ({ username, onLogout }) => {
  const handleSearch = () => {
    // Your search logic here
    console.log("Searching...");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src="your-logo.png" alt="Logo" />
        </Link>
      </div>
      <div className="nav-links">
        <Link id="home" to="/">
          Home
        </Link>
        <div className="search-bar">
          {/* Implement your search functionality here */}
          <input id="searchBar" type="text" placeholder="Search Biryani..." />
          <button id="searchButton" onClick={handleSearch}>
            Search
          </button>
        </div>
        <Link id="biryani" to="/all-biryanis">
          Biryani
        </Link>
        {username ? (
          <>
            <Link id="profile" to="/profile">
              Profile
            </Link>
            <button id="logoutButton" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link id="login" to="/login">
            Login
          </Link>
        )}
        <Link id="about" to="/about">
          About
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
