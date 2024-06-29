import axios from "axios";

const axiosUrl = axios.create({
    // baseURL:"http://192.168.0.104:3000",
    baseURL:"https://global-acounts-backend.vercel.app",
    withCredentials: true,
})

const useAxios = ()=>{
    return axiosUrl
}

export default useAxios