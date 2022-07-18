import React, { useEffect, useState } from "react";
import ChartListComponent from "../components/seatingChart/ChartListComponent";
import { ChartService } from "../services/ChartService";

function ChartContainer() {
  const [charts, setCharts] = useState([]);

  const fetchCharts = async () => {
    try {
      const response = await ChartService.getAllCharts();
      setCharts(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const archiveChart = async (chartKey) => {
    try {
      await ChartService.archiveChart(chartKey);
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchCharts();
  }, []);

  return <ChartListComponent chartList={charts} archiveChart={archiveChart} />;
}

export default ChartContainer;
