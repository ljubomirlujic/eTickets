import React from "react";
import RegisterForm from "../components/authentication/RegisterForm";
import { UserService } from "../services/UserService";
import { useNavigate } from "react-router-dom";

function RegisterContainer() {
  const navigate = useNavigate();
  const addUser = async (user) => {
    try {
      await UserService.addUser(user);
      navigate("/login");
    } catch (e) {
      console.error("Error while getting api");
    }
  };

  return <RegisterForm addUser={addUser} />;
}

export default RegisterContainer;
