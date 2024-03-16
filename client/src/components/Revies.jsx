import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Revies.css";

function Revies() {
  let [data, setData] = useState([]);
  // let [xdata, xsetData] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    axios.get("https://s48-nammabiryanihub.onrender.com/getUser").then((res) => {
      setData(res.data);
    });
  }, []);

  function handleClick(y) {
    navigate(`/reviewList/${y}`);
  }

  return (
    <div className="revies-container">
      <select
        className="revies-select"
        onChange={(e) => handleClick(e.target.value)}
      >
        <option>--Select User--</option>
        {data.map((user) => (
          <option key={user.id} value={user.username}>
            {user.username}
          </option>
        ))}
      </select>
    </div>
  );
}
export default Revies;
