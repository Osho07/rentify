import React, { useEffect, useState } from 'react';
import { getPropertyDetails } from '../services/property';
import { getCurrentUser } from '../services/auth';

const PropertyDetails = ({ match, history }) => {
    const [property, setProperty] = useState(null);
    const user = getCurrentUser();

    useEffect(() => {
        if (!user) {
            history.push('/login');
        } else {
            getPropertyDetails(match.params.id).then(res => {
                setProperty(res.data);
            });
        }
    }, [user, match.params.id, history]);

    if (!property) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Property Details</h2>
            <p>Location: {property.location}</p>
            <p>Area: {property.area}</p>
            <p>Bedrooms: {property.bedrooms}</p>
            <p>Bathrooms: {property.bathrooms}</p>
            <p>Nearby Amenities: {property.nearbyAmenities}</p>
            <h3>Seller Information</h3>
            <p>Name: {property.seller.firstName} {property.seller.lastName}</p>
            <p>Email: {property.seller.email}</p>
            <p>Phone: {property.seller.phone}</p>
        </div>
    );
};

export default PropertyDetails;
