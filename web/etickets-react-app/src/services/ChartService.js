import AxiosClient from "./AxiosClient";


const baseURL = "http://localhost:8080/api/charts";

export const ChartService = {
    getAllCharts,
    archiveChart

}


async function getAllCharts() {
    return await AxiosClient.get(baseURL);
}

async function archiveChart(chartKey) {
    return await AxiosClient.put(baseURL + `/archive/${chartKey}`);
}