import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie library
import "../css/Navbar.css";

// ...

// const username = Cookies.get('username');
// console.log('Username:', username);

const Navbar = ({  }) => {
  // const handleLogout = async () => {
  //   try {
  //     const response = await fetch("http://your-server-url/api/logout", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include", // Include credentials (cookies) in the request
  //     });

  //     if (response.ok) {
  //       // Clear local storage and cookies
  //       localStorage.removeItem("username");
  //       Cookies.remove("usernameCookie");

  //       // Invoke the onLogout callback passed from the parent component
  //       onLogout();

  //       console.log("Logout successful");
  //     } else {
  //       console.error("Logout failed");
  //     }
  //   } catch (error) {
  //     console.error("Error during logout:", error);
  //   }
  // };

  const handleSearch = () => {
    console.log("Searching...");
  };
  const username = Cookies.get("usernameCookie");
  let x = localStorage.getItem("username");
  console.log("Username:", username);

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
            {/* <button id="logoutButton" onClick={handleLogout}>
              Logout
            </button> */}
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
