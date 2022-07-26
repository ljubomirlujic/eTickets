import React from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Navigation() {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const searchParam = params.get("searchParam");

  const handleUrl = (type) => {
    if (searchParam == null) {
      return `/events?eventType=${type}`;
    } else {
      return `/events?searchParam=${searchParam}&eventType=${type}`;
    }
  };

  return (
    <ul className="menu">
      <li>
        <NavLink to={handleUrl("CONCERT")} className="btn nav">
          Concerts
        </NavLink>
      </li>
      <li>
        <NavLink to={handleUrl("THEATRE")} className="btn nav">
          Theatre
        </NavLink>
      </li>
      <li>
        <NavLink to={handleUrl("SPORT")} className="btn nav">
          Sport
        </NavLink>
      </li>
      <li>
        <NavLink to={handleUrl("OTHER")} className="btn nav">
          Other
        </NavLink>
      </li>
    </ul>
  );
}

export default Navigation;
