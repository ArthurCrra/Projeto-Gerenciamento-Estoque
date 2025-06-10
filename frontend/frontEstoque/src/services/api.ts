import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/', // troque pela URL real da sua API
});

export default api;

