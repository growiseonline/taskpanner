import axios from 'axios';
import { parseCookies } from "nookies";

export function getAPIClient() {
  const { 'nextauth.token': token } = parseCookies()


const api = axios.create({
    baseURL: 'http://172.16.9.13:8084'
})

api.interceptors.request.use(config => {
  console.log(config);

    return config;
})

if (token) {
  api.defaults.headers['Authorization'] = `Bearer ${token}`;
}

return api;
}


