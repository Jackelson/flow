import axios from "axios";

const service = axios.create({
    baseURL: 'http://10.11.80.221:4000/brain',
    timeout: 5000 // request timeout
  });

service.interceptors.request.use((config) => {
    return config;
}, () => {
    
})

service.interceptors.response.use((config) => {
    return config.data;
}, (err) => {
    return err;
})

export default service;