import React from "react";
import LoginForm from "../components/authentication/LoginForm";
import { LoginService } from "../services/LoginService";
import { useNavigate } from "react-router-dom";
import { TokenService } from "../services/TokenService";

function LoginContainer() {
  const navigate = useNavigate();

  const login = async (loginData) => {
    try {
      const response = await LoginService.login(loginData);
      if (response.status === 200) {
        TokenService.setToken(response.data);
        navigate("/");
      }
    } catch {
      console.error("Error while getting api");
    }
  };
  return <LoginForm login={login} />;
}

export default LoginContainer;
