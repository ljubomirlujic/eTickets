import { Button } from "antd";
import React from "react";

function ChartItem(props) {
  return (
    <div className="chartItem">
      <img src={props.chart.publishedVersionThumbnailUrl} alt="Chart" />
      <div className="event-description">
        <h4>{props.chart.name}</h4>
        <Button
          id="archiveBtn"
          type="button"
          onClick={() => props.archiveChart(props.chart.key)}
        >
          Archive
        </Button>
      </div>
    </div>
  );
}

export default ChartItem;
