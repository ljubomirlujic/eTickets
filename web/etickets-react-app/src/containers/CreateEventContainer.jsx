import { message } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import CreateForm from "../components/event/CreateForm";
import { ChartService } from "../services/ChartService";
import { EventService } from "../services/EventService";

function CreateEventContainer() {
  const [categories, setCategories] = useState([]);

  const url = window.location.search;
  const params = new URLSearchParams(url);
  const chartKey = params.get("chartKey");

  const error = () => {
    message.error("Something went wrong");
  };

  const fetchChartCategories = async (chartKey) => {
    try {
      const response = await ChartService.getChartCategories(chartKey);
      setCategories(response.data.list);
    } catch (e) {
      console.error(e);
    }
  };

  const createEvent = async (formData) => {
    try {
      await EventService.create(formData, chartKey);
      window.location.reload();
    } catch (e) {
      console.error(e);
      error();
    }
  };

  useEffect(() => {
    fetchChartCategories(chartKey);
  }, [chartKey]);
  return <CreateForm categories={categories} createEvent={createEvent} />;
}

export default CreateEventContainer;
