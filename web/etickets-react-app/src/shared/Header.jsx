import React from "react";
import Logo from "../components/header/Logo";
import Navigation from "../components/header/Navigation";
import UserOptions from "../components/header/UserOptions";

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Logo />
        <Navigation />
        <UserOptions />
      </div>
    </header>
  );
}

export default Header;
