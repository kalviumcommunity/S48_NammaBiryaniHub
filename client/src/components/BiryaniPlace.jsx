import React from 'react';
import './BiryaniPlace.css';


const BiryaniPlace = ({ name, openingHours, cuisineType, menu, contactInfo, image }) => (
  <div className="biryani-place">
    <h2>{name}</h2>
    <p>Opening Hours: {openingHours}</p>
    <p>Cuisine Type: {cuisineType}</p>
    <ul>
      {menu.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
    <p>Contact Info: {contactInfo}</p>
    <div><img src={image} alt="Restaurant" /></div>
  </div>
);

const dummyBiryaniPlaces = [
  {
    name: "Meghana Foods",
    openingHours: "Mon-Sun: 10:00 AM - 10:00 PM",
    cuisineType: "Indian",
    menu: ["Chicken Biryani",
    "Mutton Biryani",
    "Chicken Kebab"],
    contactInfo: "+91 xxxxxxxxxx",
    image: "https://imgs.search.brave.com/iZcV3r6oaa0KelrWenfU1tDjskafAy4Q4Mkl-phfr8I/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jb250/ZW50LmpkbWFnaWNi/b3guY29tL2NvbXAv/YmFuZ2Fsb3JlL3k1/LzA4MHB4eDgwLnh4/ODAuMTMwMjA1MjIz/NDA1LnEyeTUvY2F0/YWxvZ3VlL21lZ2hh/bmEtZm9vZHMtcmVz/aWRlbmN5LXJvYWQt/YmFuZ2Fsb3JlLWJp/cnlhbmktcmVzdGF1/cmFudHMtdXltY2p2/bWI2NC5qcGc_dz0z/ODQwJnE9NzU"
  },
  {
    name: "Nandana Palace",
    openingHours: "Mon-Sun: 10:00 AM - 10:00 PM",
    cuisineType: "Indian",
    menu: ["Chicken Dum Biryani",
    "Mutton Keema Biryani",
    "Chicken Tikka"],
    contactInfo: "+91 xxxxxxxxxx",
    image: "https://imgs.search.brave.com/8jRXC7w13yasR-a3THiBwgUeqjloOlW8n8LFTfjYkHA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9iaXJ5/YW5pcGFsYWNlLmNh/L3N0b3JhZ2UvMjAy/My8xMi9CaXJ5YW5p/LTEuanBlZw",
    

  },
  {
    name: "Empire",
    openingHours: "Mon-Sun: 11:30 AM - 11:00 PM",
    cuisineType: "Indian",
    menu: ["Chicken Fry", "Veg Pulao", "Chicken Lollipop"],
    contactInfo: "+91 xxxxxxxxxx",
    image: "https://i.pinimg.com/564x/1b/0b/35/1b0b355d3cc81b926df0c911c7032e74.jpg"
  },
];

export { BiryaniPlace, dummyBiryaniPlaces };
