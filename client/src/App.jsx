import React from 'react';
import { BiryaniPlace, dummyBiryaniPlaces } from './components/BiryaniPlace';
import "./App.css"

const App = () => {
  return (
    <div className="app-container">
      {dummyBiryaniPlaces.map((place, index) => (
        <BiryaniPlace key={index} {...place} />
      ))}
    </div>
  );
};

export default App;
