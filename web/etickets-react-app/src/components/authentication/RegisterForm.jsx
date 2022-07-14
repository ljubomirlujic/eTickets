import React, { useState } from "react";
import { Input, Form } from "antd";
import { SendOutlined } from "@ant-design/icons";

const defaultUser = {
  name: "",
  surname: "",
  email: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  phoneNumber: "",
  password: "",
};
function RegisterForm(props) {
  const [user, setUser] = useState(defaultUser);

  const handleChange = (event, prop) => {
    setUser({
      ...user,
      [prop]: event.target.value,
    });
  };

  return (
    <div className="register-form">
      <h2>Sign up</h2>
      <Form
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={() => {
          props.addUser(user);
        }}
      >
        <Form.Item
          label="First name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input onChange={(event) => handleChange(event, "name")} />
        </Form.Item>
        <Form.Item
          label="Surname"
          name="surname"
          rules={[
            {
              required: true,
              message: "Please input your surname!",
            },
          ]}
        >
          <Input onChange={(event) => handleChange(event, "surname")} />
        </Form.Item>
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
          label="Address"
          name="address"
          rules={[
            {
              message: "Please input your address",
            },
          ]}
        >
          <Input onChange={(event) => handleChange(event, "address")} />
        </Form.Item>
        <Form.Item
          label="City"
          name="city"
          rules={[
            {
              message: "Please input your city",
            },
          ]}
        >
          <Input onChange={(event) => handleChange(event, "city")} />
        </Form.Item>
        <Form.Item
          label="State"
          name="state"
          rules={[
            {
              message: "Please input your state",
            },
          ]}
        >
          <Input onChange={(event) => handleChange(event, "state")} />
        </Form.Item>
        <Form.Item
          label="Zip code"
          name="zipCode"
          rules={[
            {
              message: "Please input your Zip code",
            },
          ]}
        >
          <Input onChange={(event) => handleChange(event, "zipCode")} />
        </Form.Item>
        <Form.Item
          label="Phone number"
          name="phoneNumber"
          rules={[
            {
              message: "Please input your phone number",
            },
          ]}
        >
          <Input onChange={(event) => handleChange(event, "phoneNumber")} />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your username!",
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
  );
}

export default RegisterForm;
