import React from "react";
import EventItem from "../home/EventItem";
function Events(props) {
  return (
    <div className="home-right-side">
      <h1 style={{ textAlign: "center", fontFamily: "monospace", margin: 0 }}>
        Upcoming Events
      </h1>
      <div className="events-container">
        {props.eventsList.map((event, i) => (
          <EventItem event={event} key={i} deleteEvent={props.deleteEvent} />
        ))}
      </div>
    </div>
  );
}

export default Events;
