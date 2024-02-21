import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/getBiryaniP") 
      .then((response) => {
        console.log("Response:", response.data);
        setPlaces(response.data)})
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      {Array.isArray(places) && places.length > 0 ? (
        places.map((place, index) => (
          <div key={index}>
            <p>Name: {place.name}</p>
            <p>Opening Hours: {place.openingHours}</p>
            <p>Cuisine Type: {place.cuisineType}</p>
            <p>Menu: {place.menu.join(', ')}</p>
            <p>Contact Info: {place.contactInfo}</p>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
  
};

export default App;
