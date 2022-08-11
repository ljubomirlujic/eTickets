import AxiosClient from "./AxiosClient";


const baseURL = "http://localhost:8080/api/events";

export const EventService = {
    getAllEvents,
    getOne,
    getAvailableReport,
    create,
    update,
    bookSeats,
    bookBestAvailable,
    releaseSeats,
    deleteEvent

}

async function getAllEvents(eventType, searchParam) {

    return await AxiosClient.get(baseURL + `?searchParam=${searchParam}&eventType=${eventType}`);
}

async function getOne(id) {
    return await AxiosClient.get(baseURL + `/${id}`);
}


async function getAvailableReport(eventId) {
    return await AxiosClient.get(baseURL + `/${eventId}/availableSeats`);
}


async function create(formData, chartKey) {
    return await AxiosClient.post(baseURL + `?chartKey=${chartKey}`, formData);
}

async function update(formData, id) {
    return await AxiosClient.put(baseURL + `/${id}`, formData);
}

async function deleteEvent(id) {
    return await AxiosClient.delete(baseURL + `/${id}`);
}


async function bookSeats(eventId, objects) {
    return await AxiosClient.put(baseURL + `/event/${eventId}/bookSeats`, objects);
}

async function bookBestAvailable(eventId, objects) {
    return await AxiosClient.post(baseURL + `/${eventId}/bookBestAvailable`, objects);
}

async function releaseSeats(eventId, objects) {
    return await AxiosClient.post(baseURL + `/${eventId}/releaseSeats`, objects);
}