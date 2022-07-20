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

  const url = window.location.search;
  const params = new URLSearchParams(url);
  const eventKey = params.get("eventKey");

  const fetchEvent = async (eventKey) => {
    try {
      const response = await EventService.getOne(eventKey);
      setEvent(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchEvent(eventKey);
  }, []);
  return <EventView event={event} />;
}

export default EventContainer;
