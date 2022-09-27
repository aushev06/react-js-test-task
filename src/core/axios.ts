import globalAxios  from 'axios';
globalAxios.defaults.baseURL = 'http://localhost:3333';



globalAxios.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }

    return config;
});

export const axios = globalAxios;
