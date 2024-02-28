// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import AddEntityForm from "./components/AddEntityForm"; 
// import UpdateEntityForm from "./components/UpdateEntityForm";
// import DeleteButton from "./components/DeleteButton";
// import "./App.css";

// const App = () => {
  // const [places, setPlaces] = useState([]);
//   const [selectedEntityId, setSelectedEntityId] = useState(null);

  // const fetchData = () => {
  //   axios
  //     .get("http://localhost:3000/getBiryaniP")
  //     .then((response) => {
  //       setPlaces(response.data.data);
  //     })
  //     .catch((error) => console.error("Error fetching data:", error));
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

//   const handleEntityAdded = () => {
//     fetchData();
//   };

//   const handleEntityUpdated = () => {
//     fetchData();
//     setSelectedEntityId(null); // Reset selected entity ID after updating
//   };

//   const handleEntityDeleted = () => {
//     fetchData();
//     setSelectedEntityId(null); // Reset selected entity ID after deleting
//   };

//   return (
//     <div className="app-container">
//       <div className="left-pane">
//         <AddEntityForm onEntityAdded={handleEntityAdded} fetchData={fetchData} />
//       </div>
//       <div className="right-pane">
//         {places.length > 0 ? (
//           places.map((place, index) => (
//             <div key={index}>
//               <h2>Name: {place.name}</h2>
//               <p>Opening Hours: {place.openingHours}</p>
//               <p>Cuisine Type: {place.cuisineType}</p>
//               {Array.isArray(place.menu) && (
//               <p>Menu: {place.menu.join(", ")}</p>
//             )}              <p>Contact Info: {place.contactInfo}</p>
//               <UpdateEntityForm entityId={place._id} onEntityUpdated={handleEntityUpdated} fetchData={fetchData} />
//               <DeleteButton entityId={place._id} onEntityDeleted={handleEntityDeleted} fetchData={fetchData} />
//             </div>
//           ))
//         ) : (
//           <p>No data available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import BiryaniList from "./pages/BiryaniList";
import Profile from "./pages/Profile";
import About from "./pages/About"; 
import Login from "./pages/Login"; 
import "./App.css";

const App = () => {

  const [places, setPlaces] = useState([]);
  const [username, setUsername] = useState("");




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

  const handleLogin = (username) => {
    setUsername(username);
  };

  const handleLogout = () => {
    axios.post("http://localhost:3000/api/logout")
      .then(() => {
        setUsername("");
      })
      .catch((error) => console.error("Error logging out:", error));
  };

  return (
      <div className="app-container">
        <Router>
        <Navbar username={username} onLogout={handleLogout}/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all-biryanis" element={<BiryaniList />} />
            {/* <Route path="/profile" element={<Profile onEntityAdded={handleEntityAdded} fetchData={fetchData} />} /> */}
            <Route
            path="/profile"
            element={
              username ? (
                <Profile
                  onEntityAdded={handleEntityAdded}
                  fetchData={fetchData}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          </Routes>
        </Router>
      </div>
  );
};

export default App;
