import AxiosClient from "./AxiosClient";


const baseURL = "http://localhost:8081/api/users";

export const UserService = {
    addUser

}


async function addUser(user) {
    return await AxiosClient.post(baseURL, user);
}