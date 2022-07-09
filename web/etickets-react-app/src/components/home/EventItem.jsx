import React from "react";
import corba from "../../assets/img/corba.PNG";

function EventItem() {
  return (
    <div className="event">
      <img src={corba} alt="JavaScript" />
      <div className="event-description">
        <h3>Koncert Riblje Corbe</h3>
        <h5>22. Jul 2022</h5>
        <h5>TC Promenada - Novi Sad</h5>
      </div>
    </div>
  );
}

export default EventItem;
