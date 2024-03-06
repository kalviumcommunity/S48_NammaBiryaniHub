import React, { useEffect, useState } from "react";
import axios from "axios";
import ReviewList from "./ReviewList";
import { useNavigate } from "react-router-dom";

function Revies() {
  let [data, setData] = useState([]);
  let [xdata, xsetData] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/getUser").then((res) => {
      setData(res.data);
    });
  }, []);

  function handleClick(y) {
    navigate(`/reviewList/${y}`);
  }

  return (
    <div>
      <select onChange={(e) => handleClick(e.target.value)}>
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
