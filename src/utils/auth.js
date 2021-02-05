import axios from 'axios';

const auth = () => {
    const instance = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        timeout: 1000,
    });

    return instance;
};

export default auth();
