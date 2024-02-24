// UpdateEntityForm.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UpdateEntityForm.css";

const UpdateEntityForm = ({ entityId, onEntityUpdated, fetchData }) => {
  const [name, setName] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [menu, setMenu] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  // Fetch the existing data before rendering the form
  useEffect(() => {
    // Make a request to fetch the existing entity details by ID
    axios
      .get(`http://localhost:3000/api/getEntity/${entityId}`)
      .then((response) => {
        const entityData = response.data.data;
        setName(entityData.name);
        setOpeningHours(entityData.openingHours);
        setCuisineType(entityData.cuisineType);
        setMenu(entityData.menu.join(", "));
        setContactInfo(entityData.contactInfo);
      })
      .catch((error) => console.error("Error fetching entity details:", error));
  }, [entityId]);

  const handleUpdateEntity = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/updateEntity/${entityId}`, {
        name: name,
        openingHours: openingHours,
        cuisineType: cuisineType,
        menu: menu.split(",").map((item) => item.trim()),
        contactInfo: contactInfo,
      });

      if (response.data.success) {
        setName("");
        setOpeningHours("");
        setCuisineType("");
        setMenu("");
        setContactInfo("");
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
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

      <label>Opening Hours:</label>
      <input type="text" value={openingHours} onChange={(e) => setOpeningHours(e.target.value)} />

      <label>Cuisine Type:</label>
      <input type="text" value={cuisineType} onChange={(e) => setCuisineType(e.target.value)} />

      <label>Menu</label>
      <input type="text" value={menu} onChange={(e) => setMenu(e.target.value)} />

      <label>Contact Info:</label>
      <input type="text" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} />

      <button onClick={handleUpdateEntity}>Update Entity</button>
    </div>
  );
};

export default UpdateEntityForm;
