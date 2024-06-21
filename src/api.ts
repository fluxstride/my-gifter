import axios from 'axios';

const API = axios.create({ baseURL: 'https://mygifter-be.onrender.com' });

export default API;
