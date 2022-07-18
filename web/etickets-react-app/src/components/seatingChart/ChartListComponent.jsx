import React from "react";
import ChartItem from "./ChartItem";

function ChartListComponent(props) {
  return (
    <>
      <h1 style={{ textAlign: "center", fontFamily: "monospace" }}>
        All Charts
      </h1>
      <div className="charts-container">
        {props.chartList.map((chart, i) => (
          <ChartItem chart={chart} key={i} archiveChart={props.archiveChart} />
        ))}
      </div>
    </>
  );
}

export default ChartListComponent;
