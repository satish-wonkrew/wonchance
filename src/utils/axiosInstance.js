import axios from 'axios';
import { getToken } from '@/utils/auth'; // Assuming you have a function to get the token

const axiosInstance = axios.create({
    baseURL: `http://localhost:5000/api`, // Or wherever you need
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken(); // Function to retrieve token
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;