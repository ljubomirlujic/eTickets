import React from "react";
import { SeatsioSeatingChart } from "@seatsio/seatsio-react";
import TicketItem from "./TicketItem";
import { useState } from "react";

function EventChart(props) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSelected = (ticket) => {
    setSelectedSeats((selectedSeats) => [...selectedSeats, ticket]);
  };

  const handleRemove = (ticket) => {
    setSelectedSeats((selectedSeats) =>
      selectedSeats.filter((object) => object.label !== ticket.label)
    );
  };

  return props.checked === false ? (
    <></>
  ) : (
    <>
      <div className="chart-container">
        <SeatsioSeatingChart
          workspaceKey="707052d1-8e7e-4755-8920-78d71c57ccea"
          event={props.event.eventKey}
          pricing={props.event.categories}
          priceFormatter={(price) => `${price} rsd`}
          region="eu"
          session="continue"
          divId="chart"
          onObjectSelected={handleSelected}
          onObjectDeselected={handleRemove}
        />

        <div className="selected-tickets-container">
          {selectedSeats.map((ticket, i) => (
            <TicketItem key={i} event={props.event} ticket={ticket} />
          ))}
        </div>
      </div>
    </>
  );
}

export default EventChart;
