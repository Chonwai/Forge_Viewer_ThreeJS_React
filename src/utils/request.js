import axios from 'axios';
import LocalStorage from '../utils/localstorage';

const service = () => {
    const instance = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        timeout: 3000,
    });

    instance.interceptors.request.use(
        function (config) {
            // Do something before request is sent
            config.headers = {
                Authorization: `Bearer ${LocalStorage.get('access_token')}`,
            };
            return config;
        },
        function (error) {
            // Do something with request error
            return Promise.reject(error);
        }
    );

    return instance;
};

export default service();
