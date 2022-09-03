import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Events from "../components/home/Events";
import { EventService } from "../services/EventService";

const defaultFilters = {
  dateFrom: "",
  dateTo: "",
  city: "",
};

function HomeContainer() {
  const [events, setEvents] = useState([]);
  const [cities, setCities] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [pageCount, setPageCount] = useState(0);

  const location = useLocation();

  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const param = params.get("eventType");
  const searchParam = params.get("searchParam");
  const dateFrom = params.get("dateFrom");
  const dateTo = params.get("dateTo");
  const city = params.get("city");
  const currentPage = params.get("currentPage");

  const fetchEvents = async (
    eventType,
    searchParam,
    dateFrom,
    dateTo,
    city,
    currentPage
  ) => {
    try {
      const response = await EventService.getAllEvents(
        eventType,
        searchParam,
        dateFrom,
        dateTo,
        city,
        currentPage - 1
      );
      setEvents(response.data.events);
      setPageCount(response.data.pageCount);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await EventService.getAllCities();
      setCities(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteEvent = async (id) => {
    try {
      await EventService.deleteEvent(id);
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = (event, params) => {
    event.preventDefault();

    if (param !== null && searchParam !== null) {
      navigate(
        `/events?searchParam=${searchParam}&eventType=${param}&dateFrom=${params.dateFrom}&dateTo=${params.dateTo}&city=${params.city}`
      );
    } else if (param !== null && searchParam === null) {
      navigate(
        `/events?eventType=${param}&dateFrom=${params.dateFrom}&dateTo=${params.dateTo}&city=${params.city}`
      );
    } else if (param === null && searchParam !== null) {
      navigate(
        `/events?searchParam=${searchParam}&dateFrom=${params.dateFrom}&dateTo=${params.dateTo}&city=${params.city}`
      );
    } else {
      navigate(
        `/events?dateFrom=${params.dateFrom}&dateTo=${params.dateTo}&city=${params.city}`
      );
    }
  };

  const handleUrl = (prop, event) => {
    setFilters({
      ...filters,
      [prop]: event.target.value,
    });
  };

  useEffect(() => {
    fetchEvents(
      param === null ? "" : param,
      searchParam === null ? "" : searchParam,
      dateFrom === null ? "" : dateFrom,
      dateTo === null ? "" : dateTo,
      city === null ? "" : city,
      currentPage === null ? 1 : currentPage
    );
    fetchCities();
  }, [location.search]);

  return (
    <div className="home-container">
      <div className="side-bar-filter">
        <h2>Filters</h2>
        <form onSubmit={(event) => handleSubmit(event, filters)}>
          <div className="date-filter">
            <h3>Select a date range: </h3>
            <label>Date from: </label>
            <input
              type="date"
              name="dateFrom"
              onChange={(event) => handleUrl("dateFrom", event)}
            />
            <label>Date to: </label>
            <input
              type="date"
              name="dateTo"
              onChange={(event) => handleUrl("dateTo", event)}
            />
          </div>
          <h3>Select a city: </h3>
          <div className="city-filter">
            {cities.map((city, i) => (
              <label key={i}>
                <input
                  type="radio"
                  name="city"
                  value={city}
                  checked={filters.city === city ? true : false}
                  onChange={(event) => handleUrl("city", event)}
                />
                <span>{city}</span>
              </label>
            ))}
          </div>
          <button type="submit" id="filtersBtn">
            Apply filters
          </button>
        </form>
      </div>
      <Events
        eventsList={events}
        deleteEvent={deleteEvent}
        pageCount={pageCount}
      />
    </div>
  );
}

export default HomeContainer;
