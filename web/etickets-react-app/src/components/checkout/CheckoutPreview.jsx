import React from "react";
import { DateTimeFormater } from "../../services/DateTimeFormater";
import TicketPreviewComponent from "./TicketPreviewComponent";

function CheckoutPreview(props) {
  const sumPrice = (tickets) => {
    let price = 0;
    for (let ticket of tickets.tickets) {
      price += ticket.price;
    }

    return price;
  };

  console.log(props.customerPaymentMethod);
  return (
    <>
      <h1>Cart Preview</h1>
      <div className="preview-container">
        <h3>{props.tickets.eventName}</h3>
        <h5>{DateTimeFormater.splitDateAndTime(props.tickets.eventDate)}</h5>
        {props.tickets.tickets.map((ticket, i) => (
          <TicketPreviewComponent ticket={ticket} key={i} />
        ))}
      </div>
      <h3>Total price: {sumPrice(props.tickets)}</h3>
    </>
  );
}

export default CheckoutPreview;
