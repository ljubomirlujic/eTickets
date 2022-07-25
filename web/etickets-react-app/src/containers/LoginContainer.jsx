import React from "react";
import LoginForm from "../components/authentication/LoginForm";
import { LoginService } from "../services/LoginService";
import { useNavigate } from "react-router-dom";
import { TokenService } from "../services/TokenService";
import { message } from "antd";

function LoginContainer() {
  const navigate = useNavigate();

  const errorMsg = () => {
    message.error("Bad credentials!");
  };

  const login = async (loginData) => {
    try {
      const response = await LoginService.login(loginData);
      if (response.status === 200) {
        TokenService.setToken(response.data);
        navigate("/");
      }
    } catch (error) {
      if (error.response.data.status === 403) {
        errorMsg();
      }
      console.log(error);
    }
  };
  return <LoginForm login={login} />;
}

export default LoginContainer;
