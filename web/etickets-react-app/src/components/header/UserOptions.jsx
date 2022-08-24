import React from "react";
import { Link } from "react-router-dom";
import user from "../../assets/img/user-icon.svg";

import { useState } from "react";
import { TokenService } from "../../services/TokenService";
import { SettingFilled } from "@ant-design/icons";
import { useEffect } from "react";

function UserOptions() {
  const [optionsList, setOptionsList] = useState([]);
  const [displayAdminOptions, setDisplayAdminOptions] = useState("none");
  const handleLogOut = () => {
    TokenService.removeToken();
    setOptionsList([]);
  };

  let key = 0;
  const loginLink = (
    <Link to={"/login"} key={key++}>
      Login
    </Link>
  );
  const registerLink = (
    <Link to={"/register"} key={key++}>
      Sing up
    </Link>
  );
  const profilLink = (
    <Link to={"/profile"} key={key++}>
      Profil
    </Link>
  );
  const logOutLink = (
    <Link to={"/"} onClick={handleLogOut} key={key++}>
      Log out
    </Link>
  );

  useEffect(() => {
    if (TokenService.getToken()) {
      const options = [];
      options.push(profilLink);
      options.push(logOutLink);
      setOptionsList(options);
      if (TokenService.getRole() === "ADMIN") {
        setDisplayAdminOptions("block");
      }
    } else {
      const options = [];
      options.push(loginLink);
      options.push(registerLink);
      setOptionsList(options);
    }
  }, []);

  return (
    <ul className="user-options">
      <li>
        <div className="dropdown">
          <button className="dropbtn">
            <img id="user-icon" src={user} alt="user icon" />
          </button>
          <div className="dropdown-content">
            {optionsList.map((item) => item)}
          </div>
        </div>
      </li>
      <li>
        <div className="admin-options" style={{ display: displayAdminOptions }}>
          <SettingFilled id="settings-icon" />
          <div className="dropdown-content">
            <Link to={"/chartList"}>Create event</Link>
            <Link to={"/chartDesigner"}>Create seating chart</Link>
          </div>
        </div>
      </li>
    </ul>
  );
}

export default UserOptions;
