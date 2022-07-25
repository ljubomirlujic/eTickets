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
  const eventId = params.get("eventId");

  const fetchEvent = async (eventId) => {
    try {
      const response = await EventService.getOne(eventId);
      setEvent(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchEvent(eventId);
  }, [eventId]);
  return <EventView event={event} />;
}

export default EventContainer;
