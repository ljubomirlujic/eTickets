import React from "react";
import { SeatsioSeatingChart } from "@seatsio/seatsio-react";
import TicketItem from "./TicketItem";
import { useState } from "react";
import { Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function EventChart(props) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSelected = (ticket) => {
    setSelectedSeats((selectedSeats) => [...selectedSeats, ticket]);
  };

  const handleRemove = (ticket) => {
    setSelectedSeats((selectedSeats) =>
      selectedSeats.filter((object) => object.id !== ticket.id)
    );
  };

  const handleClick = () => {
    const tickets = [];
    selectedSeats.map((ticket) => {
      const _ticket = {
        label: ticket.label,
        category: ticket.category.label,
        price: ticket.pricing.price,
      };
      return tickets.push(_ticket);
    });

    const checkoutTicket = {
      eventId: props.event.id,
      eventName: props.event.name,
      eventDate: props.event.date,
      tickets: tickets,
    };
    localStorage.setItem("cart", JSON.stringify(checkoutTicket));
  };

  const handleTokenExpired = () => {
    localStorage.removeItem("cart");
  };

  const handleDisabledBtn = () => {
    if (selectedSeats.length > 0) {
      return 0;
    }
    return 1;
  };

  return (
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
          maxSelectedObjects="6"
          showLegend="true"
          onObjectSelected={handleSelected}
          showRowLabels="true"
          showRowLines="true"
          onObjectDeselected={handleRemove}
          onHoldTokenExpired={handleTokenExpired}
        />
        <div className="selected-tickets-container">
          {selectedSeats.map((ticket, i) => (
            <TicketItem key={i} event={props.event} ticket={ticket} />
          ))}
        </div>
      </div>
      <div className="continue-btn-container">
        <Button
          className="ant-btn-primary"
          onClick={handleClick}
          disabled={handleDisabledBtn()}
        >
          <Link to={"/checkout"}>
            CONTINUE <SendOutlined id="sendBtnArrow" />
          </Link>
        </Button>
      </div>
    </>
  );
}

export default EventChart;
