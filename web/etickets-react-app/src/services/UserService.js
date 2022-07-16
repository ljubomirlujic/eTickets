import AxiosClient from "./AxiosClient";


const baseURL = "http://localhost:8080/api/users";

export const UserService = {
    addUser,
    isUserLogged

}


async function addUser(user) {
    return await AxiosClient.post(baseURL, user);
}

function isUserLogged() {
    if (localStorage.getItem("token")) {
        return true
    }
    else {
        return false
    }
}