import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import fetching from './sample';


import './App.css'; 

const App = () => {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [bufferDistance, setBufferDistance] = useState('');
  const [fetchedData, setFetchedData] = useState(null);
  const [mapZoom, setMapZoom] = useState(9);
  const [selectedOption, setSelectedOption] = useState('centroid');

  useEffect(() => {
    const initialView = selectedPoint ? selectedPoint : [33.275, -96.564];

    const map = L.map('map').setView(initialView, mapZoom);
    // Adding OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);


    if (selectedPoint) {
      L.circleMarker(selectedPoint, {
        radius: 5,
        color: 'black',
        fillOpacity: 1,
      }).addTo(map);


      L.circle(selectedPoint, {
        radius: bufferDistance*1000 , 
        color: 'blue',
        fillOpacity: 0.2,
      }).addTo(map);
    }


    const onMapClick = (e) => {
      setSelectedPoint([e.latlng.lat, e.latlng.lng]);
      setMapZoom(map.getZoom());
    };

    map.on('click', onMapClick);

 
    return () => {
      map.remove();
    };
  }, [selectedPoint, bufferDistance]);

  const handleBufferDistanceChange = async (e) => {
    const newBufferDistance = e.target.value;
    setBufferDistance(newBufferDistance);
  };

  const handleSubmit = async () =>{
       console.log("Enterd the handle subm,it");
    try {
      const data = await fetching(selectedPoint[0], selectedPoint[1], bufferDistance*1000, selectedOption );
      console.log("Data from API", data[0]);
      setFetchedData(data[0]);
  } catch (error) {
      console.error('Error in Returdata:', error);
  }

    
  }

  return (
    <div style={{ backgroundColor: 'orange' }}>
      <div id="map" className="map"></div>
      <br/>
      <div>
        <label><h1>Selected Point Coordinates:</h1></label>
        {selectedPoint && <span><b> Latitude: </b>{selectedPoint[0]},<br/><b> Longitude: </b>{selectedPoint[1]}</span>}
      </div>
      <div>
        <label><h2>Enter buffer distance in kilometers:</h2></label>
        <input type="number" value={bufferDistance} onChange={handleBufferDistanceChange} />
      </div>
      <div>
        {selectedPoint && bufferDistance && (
          <div>
            <h1> Select the method:</h1>
            <div>
                <label>
                  <input
                    type="radio"
                    value="centroid"
                    checked={selectedOption === 'centroid'}
                    onChange={() => setSelectedOption('centroid')}
                  />
                  Centroid Based Method
                </label>
                <br/>
                <label>
                  <input
                    type="radio"
                    value="areal"
                    checked={selectedOption === 'areal'}
                    onChange={() => setSelectedOption('areal')}
                  />
                  Areal Proportion Method
                </label>
            </div>
            <br/>
            <span><b>Please submit to fetch the results: </b></span>
            <button onClick={handleSubmit}
              style={{
                backgroundColor: 'black',
                color: 'white',
                padding: '10px 15px',
                border: 'none',
                borderRadius: "1rem",
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = 'green'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'black'}
            >Submit</button>
          </div>
        )}
      </div>
      <div>
        <h2>Fetched Data:</h2>
        {fetchedData ? (
          <div>
            <p>Total Population: {fetchedData.weighted_population}</p>
            <p>Average Salary( in Dollars): {fetchedData.weighted_average_salary}</p>
          </div>
        ) : (
          <p>No data fetched yet. Please submit to fetch results</p>
        )}
      </div>
    </div>
  );
};

export default App;
