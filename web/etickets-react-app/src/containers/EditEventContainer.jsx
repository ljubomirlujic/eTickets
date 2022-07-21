import React, { useEffect, useState } from "react";
import EditEventView from "../components/event/EditEventView";
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

function EditEventContainer() {
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
  }, [eventKey]);
  return <EditEventView event={event} />;
}

export default EditEventContainer;
