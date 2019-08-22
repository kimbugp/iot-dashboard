import requests from 'axios';

export const BASE_URL = `${window.location.protocol}://${window.location.host}:${window.location.port}`;
export const SOCIAL_LOGIN_URL = `${BASE_URL}/api/users/social/`;
export const LOGIN_URL = `${BASE_URL}/api/users/login`;



const axios = () => {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Create instance
    let instance = requests.create(defaultOptions);

    // Set the AUTH token for any request
    instance.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access_token');
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    });

    return instance;
};
export default axios()