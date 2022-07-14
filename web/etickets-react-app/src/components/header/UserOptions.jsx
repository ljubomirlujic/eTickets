import React from "react";
import { Link } from "react-router-dom";
import search from "../../assets/img/search-icon.svg";
import user from "../../assets/img/user-icon.svg";
import { Input } from "antd";
import { useState } from "react";

const { Search } = Input;

function UserOptions() {
  const [searchStyle, setSearchStyle] = useState("search-panel-invisible");
  const handleSearch = () => {
    if (searchStyle === "search-panel-invisible") {
      setSearchStyle("search-panel-visible");
    } else {
      setSearchStyle("search-panel-invisible");
    }
  };

  const onSearchHandler = (value) => console.log(value);
  return (
    <>
      <ul className="user-options">
        <li>
          <button onClick={handleSearch}>
            <img id="search-icon" src={search} alt="search icon" />
          </button>
        </li>
        <li>
          <div className="dropdown">
            <button className="dropbtn">
              <img id="user-icon" src={user} alt="user icon" />
            </button>
            <div className="dropdown-content">
              <Link to={"/login"}>Login</Link>
              <Link to={"/register"}>Sing up</Link>
            </div>
          </div>
        </li>
      </ul>
      <div className={searchStyle}>
        <Search
          placeholder="input search text"
          enterButton
          onSearch={onSearchHandler}
        />
      </div>
    </>
  );
}

export default UserOptions;
