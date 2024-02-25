import React, { useEffect, useState } from "react";
import AddEntityForm from "../components/AddEntityForm";
import "../css/Profile.css";
import axios from "axios";

const Profile = () => {
  const [places, setPlaces] = useState([]);

  const fetchData = () => {
    axios
      .get("http://localhost:3000/getBiryaniP")
      .then((response) => {
        setPlaces(response.data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEntityAdded = () => {
    fetchData();
  };

  return (
    <div>
      <div className="left-pane">
        <AddEntityForm onEntityAdded={handleEntityAdded} fetchData={fetchData} />
      </div>
    </div>
  );
};

export default Profile;
