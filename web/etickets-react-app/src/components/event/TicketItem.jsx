import React from "react";
import { DateTimeFormater } from "../../services/DateTimeFormater";

function TicketItem(props) {
  const date = DateTimeFormater.formatDate(props.event.date);
  const time = DateTimeFormater.formatTime(props.event.date);

  const color1 = props.ticket.category.color;
  const color2 = color1;

  const color3 = "#e1e1e1";
  const color4 = "#e1e1e1";

  return (
    <div id="ticket">
      <div
        className="cardWrap"
        style={{
          background: `linear-gradient(    to bottom,
          ${color1} 0%,
          ${color2} 26%,
          ${color3} 26%,
          ${color4} 100%)`,
        }}
      >
        <div className="card cardLeft">
          <div className="cardLeft content">
            <h3 id="ticket-name">{props.event.name}</h3>
            <label>NAME</label>
            <div className="date-time">
              <div className="ticket-date">
                <h3 id="ticket-date">{date}</h3>
                <label>DATE</label>
              </div>
              <div className="ticket-time">
                <h3 id="ticket-time">{time}</h3>
                <label>TIME</label>
              </div>
            </div>
          </div>
        </div>
        <div className="card cardRight">
          <h2 id="ticket-number">{props.ticket.label}</h2>
          <div className="barcode"></div>
        </div>
      </div>
    </div>
  );
}

export default TicketItem;
