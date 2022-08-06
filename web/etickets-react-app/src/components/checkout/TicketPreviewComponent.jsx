import React from "react";

function TicketPreviewComponent(props) {
  return (
    <div>
      <hr />
      <h3> Ticket:</h3>
      <div className="ticket-preview-row">
        <p>category: {props.ticket.category}</p>
        <p>price: {props.ticket.price}rsd</p>
        <p>seat: {props.ticket.label}</p>
      </div>
    </div>
  );
}

export default TicketPreviewComponent;
