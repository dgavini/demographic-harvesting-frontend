// App.js

import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import './App.css'; // Include your CSS file if you have one

const App = () => {
  useEffect(() => {
    // Setting up the map
    const map = L.map('map').setView([51.505, -0.09], 13);

    // Adding OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Adding a marker
    const marker = L.marker([51.5, -0.09]).addTo(map);

    // Adding a circle
    const circle = L.circle([51.508, -0.11], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500,
    }).addTo(map);

    // Adding a polygon
    const polygon = L.polygon([
      [51.509, -0.08],
      [51.503, -0.06],
      [51.51, -0.047],
    ]).addTo(map);

    // Adding popups
    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
    circle.bindPopup("I am a circle.");
    polygon.bindPopup("I am a polygon.");

    // Handling map click event with a popup
    const popup = L.popup();
    const onMapClick = (e) => {
      popup
        .setLatLng(e.latlng)
        .setContent(`You clicked the map at ${e.latlng.toString()}`)
        .openOn(map);
    };
    map.on('click', onMapClick);

    // Clean up on component unmount
    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" className="map"></div>;
};

export default App;

