import axios from "axios";


const AxiosClient = axios.create({
    baseURL: "http://localhost:8080"
});

AxiosClient.interceptors.request.use(function success(config) {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
});


export default AxiosClient;