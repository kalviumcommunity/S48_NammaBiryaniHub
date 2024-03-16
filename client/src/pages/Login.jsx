import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://s48-nammabiryanihub.onrender.com/api/login", {
        username: username,
        password: password,
        email: email,
      });
       localStorage.setItem("userID", response.data.userId);
      console.log("sdfsdfsdf-xyz", localStorage.getItem("userID"));
      localStorage.setItem("token", response.data.token);
      Cookies.set("tokenCookie", response.data.token);
      console.log(response.data);

      localStorage.setItem("username", response.data.username);
      Cookies.set("usernameCookie", response.data.username);

      if (response.data.success) {
        setUsername("");
        setPassword("");
        setEmail("");
        onLogin();
        navigate("/all-biryanis");
      } else {
        console.error("Login failed:", response.data.message);
      }

      console.log("Server Response:", response);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://s48-nammabiryanihub.onrender.com/api/signup", {
        username: username,
        password: password,
        email: email,
      });
     
      localStorage.setItem("token", response.data.token);
      Cookies.set("tokenCookie", response.data.token);

      localStorage.setItem("username", response.data.username);
      Cookies.set("usernameCookie", response.data.username);

      if (response.data.success) {
        setUsername("");
        setPassword("");
        setEmail("");
        onLogin();
        navigate("/all-biryanis");
      } else {
        console.error("Signup failed:", response.data.message);
      }

      console.log("Server Response:", response);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login / Signup </h2>
      <input
        className="input-field"
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        className="input-field"
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <input
        className="input-field"
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
      <button className="signup-button" onClick={handleSignup}>
        Signup
      </button>
    </div>
  );
};

export default Login;
