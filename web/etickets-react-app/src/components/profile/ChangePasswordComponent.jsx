import React, { useState } from "react";
import { Input, Form } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { message } from "antd";
const defaultData = {
  oldPassword: "",
  newPassword: "",
};

function ChangePasswordComponent(props) {
  const [formData, setFormData] = useState(defaultData);
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const handleChange = (event, prop) => {
    setFormData({
      ...formData,
      [prop]: event.target.value,
    });
  };

  const handleRepeatPassword = (event) => {
    setRepeatedPassword(event.target.value);
  };

  const checkNewPassword = () => {
    let correct = true;
    if (formData.newPassword === "") {
      correct = false;
    }
    if (formData.newPassword !== repeatedPassword) {
      correct = false;
    }
    return correct;
  };

  const changePassword = () => {
    if (checkNewPassword()) {
      props.changePassword(formData);
    } else {
      message.error("The repeated password does not match");
    }
  };

  return (
    <Form
      labelCol={{
        span: 10,
      }}
      wrapperCol={{
        span: 16,
      }}
      onFinish={changePassword}
    >
      <Form.Item
        label="Old password"
        name="oldPassword"
        rules={[
          {
            required: true,
            message: "Please input your old password!",
          },
        ]}
      >
        <Input.Password
          onChange={(event) => handleChange(event, "oldPassword")}
        />
      </Form.Item>
      <Form.Item
        label="New password"
        name="newPassword"
        rules={[
          {
            required: true,
            message: "Please input your new password!",
          },
        ]}
      >
        <Input.Password
          onChange={(event) => handleChange(event, "newPassword")}
        />
      </Form.Item>
      <Form.Item
        label="Repeat password"
        name="repeatPassword"
        rules={[
          {
            required: true,
            message: "Please input your new password again!",
          },
        ]}
      >
        <Input.Password onChange={handleRepeatPassword} />
      </Form.Item>

      <button type="submit" id="submitBtn">
        Send <SendOutlined id="sendBtnArrow" />
      </button>
    </Form>
  );
}

export default ChangePasswordComponent;
