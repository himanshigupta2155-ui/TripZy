import axios from 'axios'
const axiosInstance = axios.create({
    // baseURL:"http://localhost:8008/",
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8008/",
    withCredentials:true,
    headers:{
        "Content-Type":"application/json"
    }

})
export default axiosInstance