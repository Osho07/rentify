import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/api/properties';

export const postProperty = (propertyData) => {
    return axios.post(API_URL, propertyData, { headers: authHeader() });
};

export const getProperties = () => {
    return axios.get(API_URL);
};

export const getMyProperties = () => {
    return axios.get(`${API_URL}/my-properties`, { headers: authHeader() });
};

export const updateProperty = (id, propertyData) => {
    return axios.put(`${API_URL}/${id}`, propertyData, { headers: authHeader() });
};

export const deleteProperty = (id) => {
    return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
};
