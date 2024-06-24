import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const baseURL: string = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL,
});

export default API;
