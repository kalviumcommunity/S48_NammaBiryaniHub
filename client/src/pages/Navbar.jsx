import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "../css/Navbar.css";
import Revies from "../components/Revies";
import image from "../assets/asap-chick.png";
import image1 from "../assets/namma-biryani-hub.png"

const Navbar = ({}) => {
  const username = Cookies.get("usernameCookie");
  let x = localStorage.getItem("username");
  console.log("Username:", username);

  return (
    <nav className="navbar">
      <Link to="/">
        <div className="logo">
          <img src={image} alt="" />
        </div>
      </Link>

      <div className="nav-links">
        <Link id="home" to="/">
          Home
        </Link>
        <div className="search-bar">
          <img id="loggo"src={image1} alt="" />

        </div>
        <Link id="biryani" to="/all-biryanis">
          Biryani
        </Link>
        {username ? (
          <>
            <Link id="profile" to="/profile">
              Profile
            </Link>
          </>
        ) : (
          <Link id="login" to="/login">
            Login
          </Link>
        )}
        <div id="revies">
          <Revies />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
