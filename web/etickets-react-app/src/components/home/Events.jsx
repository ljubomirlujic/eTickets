import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventItem from "../home/EventItem";
function Events(props) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const params = window.location.search;
  const totalPages = Array(props.pageCount)
    .fill(0)
    .map((e, i) => i + 1);

  const handleNext = () => {
    if (page < props.pageCount) {
      setPage((page) => page + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage((page) => page - 1);
    }
  };

  const handleNumClick = (num) => {
    setPage(num);
  };

  useEffect(() => {
    if (params === "" || params.includes("?currentPage")) {
      navigate(`/events?currentPage=${page}`);
    } else if (params.includes("&currentPage")) {
      navigate(`/events${params.split("&currentPage")[0]}&currentPage=${page}`);
    } else {
      navigate(`/events${params}&currentPage=${page}`);
    }
  }, [page]);

  return (
    <div className="home-right-side">
      <h1 style={{ textAlign: "center", fontFamily: "monospace", margin: 0 }}>
        Upcoming Events
      </h1>
      <div className="events-container">
        {props.eventsList.map((event, i) => (
          <EventItem event={event} key={i} deleteEvent={props.deleteEvent} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevious}>&lt;</button>
        {totalPages.map((pageNum, i) => (
          <h5
            id="page-num-list"
            key={i}
            onClick={() => handleNumClick(pageNum)}
            style={pageNum === page ? { color: "black" } : {}}
          >
            {pageNum}
          </h5>
        ))}
        <button onClick={handleNext}>&gt;</button>
      </div>
    </div>
  );
}

export default Events;
