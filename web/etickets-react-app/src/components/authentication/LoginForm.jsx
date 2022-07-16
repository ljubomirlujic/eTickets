import React, { useState } from "react";
import { Input, Form } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const defaultLoginData = {
  email: "",
  password: "",
};

function LoginForm(props) {
  const [loginData, setLoginData] = useState(defaultLoginData);

  const handleChange = (event, prop) => {
    setLoginData({
      ...loginData,
      [prop]: event.target.value,
    });
  };

  return (
    <>
      <h4 id="authentication-h4">
        New user? <Link to={"/register"}>Sign up</Link>
      </h4>
      <div className="register-form">
        <h2>Log in</h2>
        <Form
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={() => {
            props.login(loginData);
          }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input onChange={(event) => handleChange(event, "email")} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              onChange={(event) => handleChange(event, "password")}
            />
          </Form.Item>

          <button type="submit" id="submitBtn">
            Send <SendOutlined id="sendBtnArrow" />
          </button>
        </Form>
      </div>
    </>
  );
}

export default LoginForm;
