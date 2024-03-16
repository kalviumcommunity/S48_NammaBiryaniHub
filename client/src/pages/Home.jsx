import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Home.css";

const Home = () => {
  const [randomBiryani, setRandomBiryani] = useState(null);

  useEffect(() => {
    // Function to fetch a random biryani
    const fetchRandomBiryani = async () => {
      try {
        const response = await axios.get(
          "https://s48-nammabiryanihub.onrender.com/getRandomBiryani"
        );

        // Check if the response contains data
        if (response.data && response.data.data) {
          setRandomBiryani(response.data.data);
        } else {
          console.error("Invalid response format:", response);
        }
      } catch (error) {
        console.error("Error fetching random biryani:", error);
      }
    };

    // Fetch random biryani when the component mounts
    fetchRandomBiryani();
  }, []); // The empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div className="home-container">
      <h1>Biryani of the Moment</h1>
      {randomBiryani && (
        <div className="random-biryani">
          <p><b>Name:</b> {randomBiryani.dish}</p>
          <p><b>Restaurent Name:</b> {randomBiryani.restaurantName}</p>
          <p><b>Opening Hours:</b> {randomBiryani.openingHours}</p>
          <p><b>Cuisine Type:</b> {randomBiryani.cuisineType}</p>
          <p><b>Contact Info:</b> {randomBiryani.contactInfo}</p>
          <p><b>Rating:</b> {randomBiryani.rating}</p>
          <p id="review"><b>Review:</b> {randomBiryani.review}</p>
          <img src={randomBiryani.image} alt="" />
          {/* <ul>
            {randomBiryani.menu.map((menuItem, i) => (
              <li key={i}>{menuItem}</li>
            ))}
          </ul> */}
        </div>
      )}
      {/* Add your home content */}
    </div>
  );
};

export default Home;
