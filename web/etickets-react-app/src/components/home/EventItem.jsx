import React from "react";
import { DateTimeFormater } from "../../services/DateTimeFormater";

function EventItem(props) {
  const date = DateTimeFormater.formatDate(props.event.date);

  return (
    <div className="event">
      <img
        src={`data:image/png;base64,${props.event.image.data}`}
        alt="Event"
      />
      <div className="event-description">
        <h4>{props.event.name}</h4>
        <h5>{date}</h5>
        <h5>{props.event.location}</h5>
      </div>
    </div>
  );
}

export default EventItem;
