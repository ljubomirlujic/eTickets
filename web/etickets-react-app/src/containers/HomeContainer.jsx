import React from "react";
import { useState, useEffect } from "react";

import Events from "../components/home/Events";
import { EventService } from "../services/EventService";

function HomeContainer() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await EventService.getAllEvents();
      setEvents(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteEvent = async (id) => {
    try {
      await EventService.deleteEvent(id);
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return <Events eventsList={events} deleteEvent={deleteEvent} />;
}

export default HomeContainer;
