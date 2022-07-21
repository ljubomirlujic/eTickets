import React from "react";
import { DateTimeFormater } from "../../services/DateTimeFormater";
import { Link } from "react-router-dom";
import { Button } from "antd";

function EventItem(props) {
  const date = DateTimeFormater.formatDate(props.event.date);
  return (
    <div className="event">
      <Link to={`/event?eventKey=${props.event.eventKey}`}>
        <img
          src={`data:image/png;base64,${props.event.image.data}`}
          alt="Event"
        />
      </Link>
      <div className="event-description">
        <h4>{props.event.name}</h4>
        <h5>{date}</h5>
        <h5>{props.event.location}</h5>
      </div>
      <div className="event-buttons">
        <Button id="editBtn">
          <Link to={`/editEvent?eventKey=${props.event.eventKey}`}>Edit</Link>
        </Button>
        <Button id="deleteBtn">Delete</Button>
      </div>
    </div>
  );
}

export default EventItem;
