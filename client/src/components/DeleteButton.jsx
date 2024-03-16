import React from "react";
import axios from "axios";

const DeleteButton = ({ entityId, onEntityDeleted, fetchData }) => {
  const handleDeleteEntity = async () => {
    try {
      const response = await axios.delete(`https://s48-nammabiryanihub.onrender.com/api/deleteEntity/${entityId}`);

      if (response.data.success) {
        onEntityDeleted();
        fetchData();
      } else {
        console.error("Failed to delete entity");
      }
    } catch (error) {
      console.error("Error deleting entity:", error);
    }
  };

  return (
    <button onClick={handleDeleteEntity} className="delete-button">
      Delete Entity
    </button>
  );
};

export default DeleteButton;
