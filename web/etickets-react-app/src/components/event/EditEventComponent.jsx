import React, { useState } from "react";
import { SeatsioEventManager } from "@seatsio/seatsio-react";
import EventForm from "./EventForm";

function EditEventComponent(props) {
  const categories = props.categories;

  return (
    <div className="edit-event-container">
      <div className="edit-event-chart">
        <SeatsioEventManager
          secretKey="1b9652d8-26aa-414b-b0d3-eb5176de8bbe"
          event={props.event.eventKey}
          mode="manageForSaleConfig"
          region="eu"
          divId="chart"
        />
      </div>
      <div className="edit-form">
        <EventForm
          categories={categories}
          title={"Edit Event"}
          event={props.event}
          handleForm={props.handleForm}
        />
      </div>
    </div>
  );
}

export default EditEventComponent;
