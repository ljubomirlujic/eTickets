import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.svg";

function Logo() {
  return (
    <Link to="/" className="logo">
      <img id="logo" src={logo} alt="Logo" />
    </Link>
  );
}

export default Logo;
