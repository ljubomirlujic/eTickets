import AxiosClient from "./AxiosClient";


const baseURL = "http://localhost:8080/api/users";

export const UserService = {
    addUser,
    updateUser,
    getLoggedUser,
    changePassword,
    isUserLogged

}


async function addUser(user) {
    return await AxiosClient.post(baseURL, user);
}

async function getLoggedUser() {
    return await AxiosClient.get(baseURL + "/loggedUser")
}

async function changePassword(data) {
    return await AxiosClient.post(baseURL + "/changePassword", data)
}

async function updateUser(id, user) {
    console.log(id + user)
    return await AxiosClient.put(baseURL + `/${id}`, user)
}



function isUserLogged() {
    if (localStorage.getItem("token")) {
        return true
    }
    else {
        return false
    }
}