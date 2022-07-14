import React from "react";
import EventItem from "../home/EventItem";
function Events(props) {
  return (
    <div className="events-container">
      {props.eventsList.map((event, i) => (
        <EventItem event={event} key={i} />
      ))}
    </div>
  );
}

export default Events;
