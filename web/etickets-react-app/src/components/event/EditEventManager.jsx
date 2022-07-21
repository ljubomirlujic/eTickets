import React from "react";
import { SeatsioEventManager } from "@seatsio/seatsio-react";

function EventManagerComponent(props) {
  return (
    <div style={{ height: "500px" }}>
      <SeatsioEventManager
        secretKey="1b9652d8-26aa-414b-b0d3-eb5176de8bbe"
        event={props.event.eventKey}
        mode="manageForSaleConfig"
        region="eu"
      />
    </div>
  );
}

export default EventManagerComponent;
