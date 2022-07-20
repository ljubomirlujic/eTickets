import AxiosClient from "./AxiosClient";


const baseURL = "http://localhost:8080/api/charts";

export const ChartService = {
    getAllCharts,
    archiveChart,
    getChartCategories

}


async function getAllCharts() {
    return await AxiosClient.get(baseURL);
}

async function getChartCategories(chartkey) {
    return await AxiosClient.get(baseURL + `/categories/${chartkey}`);
}

async function archiveChart(chartKey) {
    return await AxiosClient.put(baseURL + `/archive/${chartKey}`);
}