import axios from 'axios';

const api = axios.create({
    baseURL: 'https://earthnova.onrender.com/api',
});

export default api;
