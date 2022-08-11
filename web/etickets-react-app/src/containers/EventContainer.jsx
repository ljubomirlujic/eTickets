import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import EventView from "../components/event/EventView";
import { EventService } from "../services/EventService";

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

function EventContainer() {
  const [event, setEvent] = useState(defaultEvent);
  const [availableReport, setAvailableReport] = useState({});

  const url = window.location.search;
  const params = new URLSearchParams(url);
  const eventId = params.get("eventId");

  const fetchEvent = async (eventId) => {
    try {
      const response = await EventService.getOne(eventId);
      setEvent(response.data);
      fetchAvailableReport(response.data.eventKey);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchAvailableReport = async (eventId) => {
    try {
      const response = await EventService.getAvailableReport(eventId);
      setAvailableReport(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchEvent(eventId);
  }, [eventId]);
  return <EventView event={event} availableReport={availableReport} />;
}

export default EventContainer;
