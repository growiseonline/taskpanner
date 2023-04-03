
import axios from 'axios';
import { parseCookies } from "nookies";

export function getAPIClient() {
  const { 'nextauth.token': token } = parseCookies()


const api = axios.create({
    baseURL: 'https://sigecloud.memt.com.br/taskplanner'
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


