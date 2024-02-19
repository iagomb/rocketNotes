import axios from "axios";

export const api = axios.create({
    baseURL:'https://rocketnotes-api-nn70.onrender.com'
})