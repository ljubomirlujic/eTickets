import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <ul className="menu">
      <li>
        <NavLink to={"/timesheet"} className="btn nav">
          Concerts
        </NavLink>
      </li>
      <li>
        <NavLink to={"/timesheet"} className="btn nav">
          Theatre
        </NavLink>
      </li>
      <li>
        <NavLink to={"/timesheet"} className="btn nav">
          Sport
        </NavLink>
      </li>
      <li>
        <NavLink to={"/timesheet"} className="btn nav">
          Other
        </NavLink>
      </li>
    </ul>
  );
}

export default Navigation;
