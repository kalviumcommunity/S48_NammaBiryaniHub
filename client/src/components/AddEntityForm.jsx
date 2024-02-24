import React, { useState } from "react";
import axios from "axios";
import "./AddEntityForm.css"

const AddEntityForm = ({ onEntityAdded, fetchData }) => {
  const [name, setName] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [menu, setMenu] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  const handleAddEntity = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/addEntity", {
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
      
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

      <label>Opening Hours:</label>
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
      />

      <button id="add-ent"onClick={handleAddEntity}>Add Entity</button>
    </div>
  );
};

export default AddEntityForm;
