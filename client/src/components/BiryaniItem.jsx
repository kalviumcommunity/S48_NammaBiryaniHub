import React, { useState } from "react";
import UpdateEntityForm from "../components/UpdateEntityForm";
import DeleteButton from "../components/DeleteButton";
import "../css/BiryaniItem.css";

const BiryaniItem = ({ place, fetchData }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleEditClick = () => {
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  
  return (
    <div className="biryani-item">
      <h2>Name: {place.name}</h2>
      <p>Opening Hours: {place.openingHours}</p>
      <p>Cuisine Type: {place.cuisineType}</p>
      {Array.isArray(place.menu) && <p>Menu: {place.menu.join(", ")}</p>}
      <p>Contact Info: {place.contactInfo}</p>
      <button onClick={handleEditClick}>Edit</button>

      {isPopupOpen && (
        <div className="popup">
          <UpdateEntityForm
            entityId={place._id}
            onEntityUpdated={() => {
              fetchData();
              handlePopupClose();
            }}
            fetchData={fetchData}
          />
          <button onClick={handlePopupClose}>Close</button>
        </div>
      )}

      <DeleteButton entityId={place._id} onEntityDeleted={fetchData} fetchData={fetchData} />
    </div>
  );
};

export default BiryaniItem;
