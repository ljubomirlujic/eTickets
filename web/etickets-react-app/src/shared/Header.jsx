import React from "react";
import Logo from "../components/header/Logo";
import Navigation from "../components/header/Navigation";
import SearchComponent from "../components/header/SearchComponent";
import UserOptions from "../components/header/UserOptions";

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Logo />
        <Navigation />
        <UserOptions />
        <SearchComponent />
      </div>
    </header>
  );
}

export default Header;
