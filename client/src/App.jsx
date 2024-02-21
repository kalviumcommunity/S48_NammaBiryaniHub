import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"

const App = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/getBiryaniP")
      .then((response) => {
        console.log("Response:", response.data.data);
        setPlaces(response.data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="biryani-place">
      {places.length > 0 ? (
        places.map((place, index) => (
          <div key={index}>
            <h2>Name: {place.name}</h2>
            <p>Opening Hours: {place.openingHours}</p>
            <p>Cuisine Type: {place.cuisineType}</p>
            <p>Menu: {place.menu}</p>
            <p>Contact Info: {place.contactInfo}</p>
            <p>{}</p>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default App;
