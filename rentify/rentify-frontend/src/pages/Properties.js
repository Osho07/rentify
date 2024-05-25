import React, { useEffect, useState } from 'react';
import { getProperties } from '../services/property';

const Properties = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        getProperties().then(res => {
            setProperties(res.data);
        });
    }, []);

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
                    </li>
                ))}
            </ul>
        </div>
    );
};
import React, { useEffect, useState } from 'react';
import { getProperties } from '../services/property';



    useEffect(() => {
        getProperties(page).then(res => {
            setProperties(res.data.properties);
            setTotalPages(res.data.pages);
        });
    }, [page]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

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
    const handleLike = (id) => {
        likeProperty(id).then(res => {
            setProperties(properties.map(property => 
                property._id === id ? { ...property, likes: res.data.likes } : property
            ));
        });
    };
    const handleInterested = (id) => {
        expressInterest(id).then(() => {
            alert('Seller details sent to your email');
        });
    };
    
    return (
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
    );
    
    



    export const getProperties = (page = 1, limit = 10) => {
        return axios.get(`${API_URL}?page=${page}&limit=${limit}`);
    };
    
