import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:
    'https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/'
});

axiosInstance.interceptors.request.use(config => {
  config.params = {};
  config.params['apikey'] = process.env.REACT_APP_MM_KEY;
  return config;
});

export default axiosInstance;
