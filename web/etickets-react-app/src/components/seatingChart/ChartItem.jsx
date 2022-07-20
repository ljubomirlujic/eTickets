import { PlusCircleFilled } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function ChartItem(props) {
  return (
    <div className="chartItem">
      <img src={props.chart.publishedVersionThumbnailUrl} alt="Chart" />
      <div className="textOverImage-container">
        <Link to={`/createEvent?chartKey=${props.chart.key}`}>
          <div className="text">
            <h2>Create Event</h2>
            <PlusCircleFilled id="plusIcon" />
          </div>
        </Link>
      </div>
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
