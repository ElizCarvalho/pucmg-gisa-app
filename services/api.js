import axios from "axios";
import { parseCookies } from "nookies";

const { "gisa-token": token } = parseCookies();

export const api = axios.create({
    baseURL: "http//localhost:8000/" 
});

if(token) {
     api.defaults.headers['access-token'] = `${token}`;
}