import React, { useEffect, useState } from "react";
import axios from "axios";
import AddEntityForm from "./components/AddEntityForm"; // Import the new form component
import "./App.css";

const App = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getBiryaniP");
      setPlaces(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEntityAdded = () => {
    fetchData(); 
  };

  return (
    <div className="biryani-place">
      <AddEntityForm onEntityAdded={handleEntityAdded} fetchData={fetchData} />
      {places.length > 0 ? (
        places.map((place, index) => (
          <div key={index}>
            <h2>Name: {place.name}</h2>
            <p>Opening Hours: {place.openingHours}</p>
            <p>Cuisine Type: {place.cuisineType}</p>
            <p>Menu: {place.menu}</p>
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
