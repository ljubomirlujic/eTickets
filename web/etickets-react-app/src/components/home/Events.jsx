import React from "react";
import EventItem from "../home/EventItem";
function Events(props) {
  return (
    <>
      <h1 style={{ textAlign: "center", fontFamily: "monospace", margin: 0 }}>
        Upcoming Events
      </h1>
      <div className="events-container">
        {props.eventsList.map((event, i) => (
          <EventItem event={event} key={i} />
        ))}
      </div>
    </>
  );
}

export default Events;
