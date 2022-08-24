import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ProfileView from "../components/profile/ProfileView";
import { UserService } from "../services/UserService";

function ProfileContainer() {
  const [user, setUser] = useState();

  const changeData = async (id, user) => {
    try {
      UserService.updateUser(id, user);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const changePassword = async (data) => {
    try {
      UserService.changePassword(data);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    UserService.getLoggedUser().then((response) => setUser(response.data));
  }, []);

  return user != undefined ? (
    <ProfileView
      user={user}
      changeData={changeData}
      changePassword={changePassword}
    />
  ) : (
    <></>
  );
}

export default ProfileContainer;
