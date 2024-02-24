import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
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
                <Link id="home"
                to="/">Home</Link>
                <div className="search-bar">
                    {/* Implement your search functionality here */}
                    <input id="searchBar" type="text" placeholder="Search Biryani..." />
                    <button id="searchButton" onClick={handleSearch}>Search</button>
                </div>
                <Link id="biryani" to="/all-biryanis">Biryani</Link>
                <Link id="profile" to="/profile">Profile</Link>
                <Link id="about" to="/about">About</Link>

            </div>
        </nav>
    );
};

export default Navbar;
