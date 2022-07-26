import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Events from "../components/home/Events";
import { EventService } from "../services/EventService";

function HomeContainer() {
  const [events, setEvents] = useState([]);

  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const param = params.get("eventType");
  const searchParam = params.get("searchParam");

  const fetchEvents = async (eventType, searchParam) => {
    try {
      const response = await EventService.getAllEvents(eventType, searchParam);
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
    fetchEvents(
      param === null ? "" : param,
      searchParam === null ? "" : searchParam
    );
  }, [location.search]);

  return <Events eventsList={events} deleteEvent={deleteEvent} />;
}

export default HomeContainer;
