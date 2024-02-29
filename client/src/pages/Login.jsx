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
      const response = await axios.post("http://localhost:3000/api/login", {
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
      const response = await axios.post("http://localhost:3000/api/signup", {
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
    <div>
      <h2>Login/Signup Page</h2>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Login;
