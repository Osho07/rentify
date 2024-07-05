import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

export const register = (userData) => {
    return axios.post(`${API_URL}/register`, userData);
};

export const login = (userData) => {
    return axios.post(`${API_URL}/login`, userData)
        .then(response => {
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};
