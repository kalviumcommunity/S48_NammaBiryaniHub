import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UpdateEntityForm.css";

const UpdateEntityForm = ({ entityId, onEntityUpdated, fetchData }) => {
  const [dish, setDish] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  // const [openingHours, setOpeningHours] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [menu, setMenu] = useState("");
  // const [contactInfo, setContactInfo] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  // const [image, setImage] = useState("");

  // Fetch the existing data before rendering the form
  useEffect(() => {
    // Make a request to fetch the existing entity details by ID
    axios
      .get(`http://localhost:3000/api/getEntity/${entityId}`)
      .then((response) => {
        console.log("Response from entity details request:", response.data);
        const entityData = response.data.data;
        setDish(entityData.dish);
        setRestaurantName(entityData.restaurantName);
        // setOpeningHours(entityData.openingHours);
        setCuisineType(entityData.cuisineType);
        setMenu(entityData.menu.join(", "));
        // setContactInfo(entityData.contactInfo);
        setRating(entityData.rating);
        setReview(entityData.review);
        // setImage(entityData.image);
      })
      .catch((error) => console.error("Error fetching entity details:", error));
  }, [entityId]);

  const handleUpdateEntity = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/updateEntity/${entityId}`, {
        dish: dish,
        restaurantName: restaurantName,
        // openingHours: openingHours,
        cuisineType: cuisineType,
        menu: menu.split(",").map((item) => item.trim()),
        // contactInfo: contactInfo,
        rating: rating,
        review: review,
        // image: image,
      });

      if (response.data.success) {
        setDish("");
        setRestaurantName("");
        // setOpeningHours("");
        setCuisineType("");
        setMenu("");
        // setContactInfo("");
        setRating("");
        setReview("");
        // setImage("");
        onEntityUpdated();
        fetchData();
      } else {
        console.error("Failed to update entity");
      }
    } catch (error) {
      console.error("Error updating entity:", error);
    }
  };

  return (
    <div className="update-entity-form">
      <h2>Update Entity</h2>
      <label>Dish:</label>
      <input type="text" value={dish} onChange={(e) => setDish(e.target.value)} />

      <label>Restaurant Name:</label>
      <input type="text" value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} />

      {/* <label>Opening Hours:</label>
      <input type="text" value={openingHours} onChange={(e) => setOpeningHours(e.target.value)} /> */}

      <label>Cuisine Type:</label>
      <input type="text" value={cuisineType} onChange={(e) => setCuisineType(e.target.value)} />

      <label>Menu:</label>
      <input type="text" value={menu} onChange={(e) => setMenu(e.target.value)} />

      {/* <label>Contact Info:</label>
      <input type="text" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} /> */}

      <label>Rating:</label>
      <input type="text" value={rating} onChange={(e) => setRating(e.target.value)} />

      <label>Review:</label>
      <input type="text" value={review} onChange={(e) => setReview(e.target.value)} />

      {/* <label>Image:</label>
      <input type="text" value={image} onChange={(e) => setImage(e.target.value)} /> */}

      <button onClick={handleUpdateEntity}>Update Entity</button>
    </div>
  );
};

export default UpdateEntityForm;
