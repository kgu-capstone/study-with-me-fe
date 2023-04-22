import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL

const defaultapi = axios.create({
    baseURL : BASE_URL,
    })

const authApi = axios.create({
        baseURL: BASE_URL,
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
    })

export { defaultapi, authApi }