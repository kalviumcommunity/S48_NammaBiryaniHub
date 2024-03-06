import React, { useState } from "react";
import axios from "axios";
import "./AddEntityForm.css";
import Cookies from "js-cookie";

const AddEntityForm = ({ onEntityAdded, fetchData }) => {
  const [dish, setDish] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  // const [openingHours, setOpeningHours] = useState("");
  // const [cuisineType, setCuisineType] = useState("");
  // const [menu, setMenu] = useState("");
  // const [contactInfo, setContactInfo] = useState("");
  const [rating, setRating] = useState(""); // New state variable for rating
  const [review, setReview] = useState(""); // New state variable for review
  // const [image, setImage] = useState(""); // New state variable for image

  const handleAddEntity = async () => {
    try {
      console.log(typeof localStorage.getItem("userID"), "dfsdfsdfdsf");
      const response = await axios.post("http://localhost:3000/api/addEntity", {
        dish: dish,
        restaurantName: restaurantName,
        // openingHours: openingHours,
        // cuisineType: cuisineType,
        // menu: menu.split(",").map((item) => item.trim()),
        // contactInfo: contactInfo,
        rating: rating,
        review: review,
        userId: localStorage.getItem("userID"),
        username: Cookies.get("usernameCookie"),
        // image: image,
      });

      if (response.data.success) {
        setDish("");
        setRestaurantName("");
        // setOpeningHours("");
        // setCuisineType("");
        // setMenu("");
        // setContactInfo("");
        setRating("");
        setReview("");
        // setImage("");
        console.log(response.data);
        onEntityAdded();
        fetchData();
      } else {
        console.error("Failed to add entity");
      }
    } catch (error) {
      console.error("Error adding entity:", error);
    }
  };

  return (
    <div className="add-entity-form">
      <label>Dish:</label>
      <input
        type="text"
        value={dish}
        onChange={(e) => setDish(e.target.value)}
      />

      <label>Restaurant Name:</label>
      <input
        type="text"
        value={restaurantName}
        onChange={(e) => setRestaurantName(e.target.value)}
      />

      {/* <label>Opening Hours:</label>
      <input
        type="text"
        value={openingHours}
        onChange={(e) => setOpeningHours(e.target.value)}
      />

      <label>Cuisine Type:</label>
      <input
        type="text"
        value={cuisineType}
        onChange={(e) => setCuisineType(e.target.value)}
      />

      <label>Menu (write with comma separated)</label>
      <input
        type="text"
        value={menu}
        onChange={(e) => setMenu(e.target.value)}
      />

      <label>Contact Info:</label>
      <input
        type="text"
        value={contactInfo}
        onChange={(e) => setContactInfo(e.target.value)}
      /> */}

      <label>Rating:</label>
      <input
        type="text"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />

      <label>Review:</label>
      <input
        type="text"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      {/* <label>Image(address):</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      /> */}

      <button id="add-ent" onClick={handleAddEntity}>
        Add Entity
      </button>
    </div>
  );
};

export default AddEntityForm;
