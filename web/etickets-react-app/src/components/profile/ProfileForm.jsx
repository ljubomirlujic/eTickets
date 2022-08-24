import React, { useState } from "react";
import { Input, Form } from "antd";
import { SendOutlined } from "@ant-design/icons";

function ProfileForm(props) {
  const [user, setUser] = useState(props.user);

  const handleChange = (event, prop) => {
    setUser({
      ...user,
      [prop]: event.target.value,
    });
  };

  return (
    <Form
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        name: user.name,
        surname: user.surname,
        email: user.email,
        address: user.address,
        city: user.city,
        state: user.state,
        zipCode: user.zipCode,
        phoneNumber: user.phoneNumber,
        password: user.password,
      }}
      onFinish={() => {
        props.changeData(user.id, user);
      }}
    >
      <Form.Item
        label="First name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please enter your name!",
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
            message: "Please enter your surname!",
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
            type: "email",
            message: "Please enter the correct email",
          },
        ]}
      >
        <Input disabled />
      </Form.Item>

      <Form.Item label="Address" name="address">
        <Input onChange={(event) => handleChange(event, "address")} />
      </Form.Item>

      <Form.Item label="City" name="city">
        <Input onChange={(event) => handleChange(event, "city")} />
      </Form.Item>
      <Form.Item label="State" name="state">
        <Input onChange={(event) => handleChange(event, "state")} />
      </Form.Item>
      <Form.Item label="Zip code" name="zipCode">
        <Input onChange={(event) => handleChange(event, "zipCode")} />
      </Form.Item>
      <Form.Item label="Phone number" name="phoneNumber">
        <Input onChange={(event) => handleChange(event, "phoneNumber")} />
      </Form.Item>

      <button type="submit" id="submitBtn">
        Send <SendOutlined id="sendBtnArrow" />
      </button>
    </Form>
  );
}

export default ProfileForm;
