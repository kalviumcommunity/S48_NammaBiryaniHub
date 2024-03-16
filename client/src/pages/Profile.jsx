import React, { useEffect, useState } from "react";
import AddEntityForm from "../components/AddEntityForm";
import "../css/Profile.css";
import Cookies from "js-cookie";
import axios from "axios";

const Profile = () => {
  const [places, setPlaces] = useState([]);
  

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
  const logout = () => {
    // axios.post("http://localhost:3000/api/logout")
    //   .then(() => {
    //     setUsername("");
    //   })
    //   .catch((error) => console.error("Error logging out:", error));

    Cookies.remove("usernameCookie")
    Cookies.remove("tokenCookie")
    window.location.reload();

  };
  const handleLogout = async ({  }) => {
    try {
      const response = await fetch("https://s48-nammabiryanihub.onrender.com/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // credentials: "include", // Include credentials (cookies) in the request
      });

      

      if (response.ok) {
        // Clear local storage and cookies
        localStorage.removeItem("username");
        Cookies.remove("usernameCookie");

        // Invoke the onLogout callback passed from the parent component
        // onLogout();

        console.log("Logout successful");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      <div className="left-pane">
        <AddEntityForm onEntityAdded={handleEntityAdded} fetchData={fetchData} />
      </div>
      <button id="logoutButton" onClick={logout}>
              Logout
      </button>
    </div>
  );
};

export default Profile;
