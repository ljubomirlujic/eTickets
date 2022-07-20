import React from "react";
import EventChart from "./EventChart";
import seatsIcon from "../../assets/img/seats_icon.svg";
import bestAvaliableIcon from "../../assets/img/best_avaliable_icon.svg";
import { useState } from "react";

function EventView(props) {
  const [chartChecked, setChartChecked] = useState(false);
  const handleChange = (event) => {
    if (event.target.value === "chart") {
      setChartChecked(true);
    } else {
      setChartChecked(false);
    }
  };

  return (
    <>
      <div className="event-header">
        <h1>{props.event.name}</h1>
        <img
          src={`data:image/png;base64,${props.event.image.data}`}
          alt="Event"
        />
      </div>
      <div className="pick-tickets-container">
        <div className="choose-pick-way">
          <hr />
          <h2>SEAT SELECTION</h2>
          <div className="seat-radio-selection">
            <label>
              Choose seats
              <input
                type="radio"
                name="radio"
                value="chart"
                onChange={handleChange}
              />
              <img id="seats-icon" src={seatsIcon} alt="seats icon" />
              <span className="checkmark"></span>
            </label>
            <label>
              Best available
              <input
                type="radio"
                name="radio"
                value="bestAvaliable"
                onChange={handleChange}
                defaultChecked
              />
              <img
                id="best-avaliable-icon"
                src={bestAvaliableIcon}
                alt="seats icon"
              />
              <span className="checkmark"></span>
            </label>
          </div>
          <hr id="second-hr" />
        </div>

        <EventChart event={props.event} checked={chartChecked} />
      </div>
    </>
  );
}

export default EventView;
