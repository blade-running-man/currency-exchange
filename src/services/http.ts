import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.exchangerate.host',
});

export default instance;
