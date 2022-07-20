import React from "react";
import { SeatsioSeatingChart } from "@seatsio/seatsio-react";

function EventChart(props) {
  return props.checked == false ? (
    <></>
  ) : (
    <>
      <div className="chart-container">
        <div className="chart-picker">
          <SeatsioSeatingChart
            workspaceKey="707052d1-8e7e-4755-8920-78d71c57ccea"
            event={props.event.eventKey}
            pricing={""}
            priceFormatter={(price) => "rsd" + price}
            region="eu"
            session="continue"
            divId="chart"
          />
        </div>
      </div>
    </>
  );
}

export default EventChart;
