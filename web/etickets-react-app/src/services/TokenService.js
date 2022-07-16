import jwtDecode from "jwt-decode";

export const TokenService = {
    getToken,
    setToken,
    removeToken,
    getRole

};

function getToken() {
    const token = localStorage.getItem("token")
    if (token) {
        return token
    }
    return null;
}

function setToken(token) {
    return localStorage.setItem("token", token);
}

function removeToken() {
    localStorage.removeItem("token");
}

function decodeToken(token) {
    try {
        return jwtDecode(token);
    } catch (error) {
        return null;
    }
}

function getRole() {
    const token = TokenService.getToken();
    const decoded_token = token ? decodeToken(token) : null;
    if (decoded_token) {
        let role = decoded_token.role.authority.replace("ROLE_", "");
        return role

    } else {
        return null;
    }
}
