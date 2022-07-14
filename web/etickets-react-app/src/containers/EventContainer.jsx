import React from "react";
import { useState, useEffect } from "react";
import Events from "../components/home/Events";
import { EventService } from "../services/EventService";

function EventContainer() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await EventService.getAllEvents();
      setEvents(response.data);
    } catch (e) {
      console.error("Error while getting api");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return <Events eventsList={events} />;
}

export default EventContainer;
