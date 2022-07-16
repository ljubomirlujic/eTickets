import AxiosClient from "./AxiosClient";


const baseURL = "http://localhost:8080/api/login";

export const LoginService = {
    login

}


async function login(loginData) {
    return await AxiosClient.post(baseURL, loginData);
}