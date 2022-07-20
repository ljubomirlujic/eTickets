import AxiosClient from "./AxiosClient";


const baseURL = "http://localhost:8080/api/events";

export const EventService = {
    getAllEvents,
    getOne,
    create

}

async function getAllEvents() {
    return await AxiosClient.get(baseURL);
}

async function getOne(eventKey) {
    return await AxiosClient.get(baseURL + `/${eventKey}`);
}

async function create(formData, chartKey) {
    return await AxiosClient.post(baseURL + `?chartKey=${chartKey}`, formData);
}