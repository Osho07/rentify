// src/pages/MyProperties.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyProperties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get('/api/properties')
      .then(response => {
        setProperties(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2>My Properties</h2>
      <ul>
        {properties.map(property => (
          <li key={property.id}>{property.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyProperties;