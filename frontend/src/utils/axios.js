import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://330ccc24d669.ngrok.io'
})
export default axiosInstance;