import React from "react";
import { SeatsioSeatingChart } from "@seatsio/seatsio-react";
import TicketItem from "./TicketItem";
import { useState } from "react";
import { useEffect } from "react";

function EventChart(props) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [prices, setPrices] = useState([]);

  const handleSelected = (ticket) => {
    setSelectedSeats((selectedSeats) => [...selectedSeats, ticket]);
  };

  const handleRemove = (ticket) => {
    setSelectedSeats((selectedSeats) =>
      selectedSeats.filter((object) => object.label !== ticket.label)
    );
  };

  const priceFormatter = () => {
    let prices = [];
    Object.entries(props.event.categories).forEach(([key, value]) => {
      let price = { category: key, price: value };
      prices.push(price);
    });
    setPrices(prices);
  };

  useEffect(() => {
    priceFormatter();
  }, [props.event]);

  return props.checked == false ? (
    <></>
  ) : (
    <>
      <div className="chart-container">
        <SeatsioSeatingChart
          workspaceKey="707052d1-8e7e-4755-8920-78d71c57ccea"
          event={props.event.eventKey}
          pricing={prices}
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
