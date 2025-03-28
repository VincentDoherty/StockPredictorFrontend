import axios from 'axios';

const instance = axios.create({
    baseURL: '/api', // Use the proxy prefix
});

export default instance;