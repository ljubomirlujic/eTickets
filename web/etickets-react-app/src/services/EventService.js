import AxiosClient from "./AxiosClient";


const baseURL = "http://localhost:8081/api/events";

export const EventService = {
    getAllEvents

}


async function getAllEvents() {
    return await AxiosClient.get(baseURL);
}