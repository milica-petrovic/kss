import axios from '../utils/axios';

export function getProducts() {
    return axios.get('/product');
}

export function submit(data) {
    return axios.post('/email', data)
}