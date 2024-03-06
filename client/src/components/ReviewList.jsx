import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ReviewList() {
  const { something } = useParams();
  const [data1, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/getAllReview",
          { username: something }
        );
        setData(response.data);
        console.log(response.data, "our data");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [something]);

  return (
    <div>
      <h1>List</h1>
      {data1.map((item, index) => (
        <div key={index}>
          <h1>{item.dish}</h1>
          <p>{item.review}</p>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;
