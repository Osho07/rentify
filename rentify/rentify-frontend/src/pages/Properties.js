import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const getProperties = (page = 1, limit = 10) => {
    return axios.get(`${API_URL}?page=${page}&limit=${limit}`);
  };

  const likeProperty = id => {
    // implement like property API call
  };

  const expressInterest = id => {
    // implement express interest API call
  };

  const handlePageChange = newPage => {
    setPage(newPage);
  };

  const handleLike = id => {
    likeProperty(id).then(res => {
      setProperties(properties.map(property =>
        property._id === id ? { ...property, likes: res.data.likes } : property
      ));
    });
  };

  const handleInterested = id => {
    expressInterest(id).then(() => {
      alert('Seller details sent to your email');
    });
  };

  useEffect(() => {
    getProperties(page).then(res => {
      setProperties(res.data.properties);
      setTotalPages(res.data.pages);
    });
  }, [page]);

  return (
    <div>
      <h2>Properties</h2>
      <ul>
        {properties.map(property => (
          <li key={property._id}>
            <p>Location: {property.location}</p>
            <p>Area: {property.area}</p>
            <p>Bedrooms: {property.bedrooms}</p>
            <p>Bathrooms: {property.bathrooms}</p>
            <p>Nearby Amenities: {property.nearbyAmenities}</p>
            <button onClick={() => handleLike(property._id)}>Like ({property.likes || 0})</button>
            <button onClick={() => handleInterested(property._id)}>I'm Interested</button>
          </li>
        ))}
      </ul>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Properties;