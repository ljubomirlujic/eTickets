import React from "react";
import { SeatsioDesigner } from "@seatsio/seatsio-react";

function ChartDesignerComponent() {
  return (
    <SeatsioDesigner
      secretKey="1b9652d8-26aa-414b-b0d3-eb5176de8bbe"
      region="eu"
      divId="chart"
    />
  );
}

export default ChartDesignerComponent;
