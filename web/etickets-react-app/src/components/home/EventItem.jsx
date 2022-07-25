import React from "react";
import { DateTimeFormater } from "../../services/DateTimeFormater";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { TokenService } from "../../services/TokenService";

function EventItem(props) {
  const date = DateTimeFormater.formatDate(props.event.date);

  let displayAdminBtns = "none";

  if (TokenService.getRole() === "ADMIN") {
    displayAdminBtns = "block";
  } else {
    displayAdminBtns = "none";
  }

  return (
    <div className="event">
      <Link to={`/event?eventId=${props.event.id}`}>
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
      <div className="event-buttons" style={{ display: displayAdminBtns }}>
        <Button id="editBtn">
          <Link to={`/editEvent?eventId=${props.event.id}`}>Edit</Link>
        </Button>
        <Button
          id="deleteBtn"
          onClick={() => props.deleteEvent(props.event.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default EventItem;
