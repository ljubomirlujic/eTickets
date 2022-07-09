import React from "react";
import { Link } from "react-router-dom";
import search from "../../assets/img/search-icon.svg";
import user from "../../assets/img/user-icon.svg";

function UserOptions() {
  const handleSearch = () => {
    alert("ss");
  };
  return (
    <ul className="user-options">
      <li>
        <button onClick={handleSearch}>
          <img id="search-icon" src={search} />
        </button>
      </li>
      <li>
        <div class="dropdown">
          <button className="dropbtn">
            <img id="user-icon" src={user} />
          </button>
          <div className="dropdown-content">
            <Link to={""}>Login</Link>
            <Link to={""}>Sing up</Link>
          </div>
        </div>
      </li>
    </ul>
  );
}

export default UserOptions;
