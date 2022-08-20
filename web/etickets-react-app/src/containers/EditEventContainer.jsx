import React, { useEffect, useState } from "react";
import EditEventComponent from "../components/event/EditEventComponent";
import { EventService } from "../services/EventService";
import { ChartService } from "../services/ChartService";
import { message } from "antd";
const defaultEvent = {
  id: "",
  name: "",
  date: "",
  location: "",
  image: {
    type: 0,
    data: "",
  },
  categories: {},
  eventKey: "",
};

function EditEventContainer() {
  const [event, setEvent] = useState(defaultEvent);
  const [categories, setCategories] = useState([]);

  const error = () => {
    message.error("Something went wrong");
  };

  const url = window.location.search;
  const params = new URLSearchParams(url);
  const eventId = params.get("eventId");

  const fetchEvent = async (eventId) => {
    try {
      const response = await EventService.getOne(eventId);
      setEvent(response.data);
      fetchChartCategories(response.data.chartKey);
    } catch (e) {
      console.error(e);
    }
  };

  const updateEvent = async (formData) => {
    try {
      await EventService.update(formData, eventId);
      window.location.reload();
    } catch (e) {
      console.error(e);
      error();
    }
  };

  const fetchChartCategories = async (chartKey) => {
    try {
      const response = await ChartService.getChartCategories(chartKey);
      setCategories(response.data.list);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchEvent(eventId);
  }, [eventId]);

  return (
    <EditEventComponent
      event={event}
      handleForm={updateEvent}
      categories={categories}
    />
  );
}

export default EditEventContainer;
