import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <ul>
          <ul className="menu">
            <li>
              <Link to={"/"} className="btn nav">
                About us
              </Link>
            </li>
            <li>
              <Link to={"/"} className="btn nav">
                Help
              </Link>
            </li>
            <li>
              <Link to={"/"} className="btn nav">
                Terms of use
              </Link>
            </li>
            <li>
              <Link to={"/"} className="btn nav">
                Privacy policy
              </Link>
            </li>
          </ul>
        </ul>
        <p>
          ©2022 eTickets All rights reserved. Entering this area and advancinig
          means that you accepted our Terms of use and Privacy policy{" "}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
