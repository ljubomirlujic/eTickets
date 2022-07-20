import { SendOutlined } from "@ant-design/icons";
import { DatePicker, Form, Input, InputNumber, message, Select } from "antd";
import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
const defaultFormData = {
  name: "",
  categories: {},
  date: "",
  location: "",
  image: "",
  type: "",
};

function CreateForm(props) {
  const [formData, setFormData] = useState(defaultFormData);

  const [images, setImages] = useState([]);

  const handleChange = (event, prop) => {
    setFormData({
      ...formData,
      [prop]: event.target.value,
    });
  };

  const handleChangeCategories = (value, key) => {
    let newCategories = formData.categories;
    newCategories[key] = value;
    setFormData({
      ...formData,
      categories: newCategories,
    });
  };

  const handleChangeDate = (value) => {
    setFormData({
      ...formData,
      date: value._d,
    });
  };

  const handleChangeSelect = (value) => {
    setFormData({
      ...formData,
      type: value,
    });
  };

  const handleChangeImage = (imageList) => {
    setImages(imageList);
    let image = imageList[0].data_url;
    const imageBase64 = image.substring(image.indexOf(",") + 1);

    setFormData({
      ...formData,
      image: imageBase64,
    });
  };

  const validate = () => {
    if (formData.date === "") {
      return false;
    }
    if (formData.type === "") {
      return false;
    }
    if (formData.image === "") {
      return false;
    }
    return true;
  };

  const error = () => {
    message.error("Fill in all the fields");
  };

  return (
    <>
      <div className="register-form">
        <h2>Create Event</h2>
        <Form
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={() => {
            if (validate()) {
              console.log(formData);
              props.createEvent(formData);
            } else {
              error();
            }
          }}
        >
          <Form.Item
            label="name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input event name!",
              },
            ]}
          >
            <Input onChange={(event) => handleChange(event, "name")} />
          </Form.Item>
          <Form.Item
            label="Location"
            name="locatin"
            rules={[
              {
                required: true,
                message: "Please input event name!",
              },
            ]}
          >
            <Input onChange={(event) => handleChange(event, "location")} />
          </Form.Item>
          <Form.Item name="date-time-picker" label="Date">
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              onChange={(value) => handleChangeDate(value)}
            />
          </Form.Item>
          <Form.Item label="Event type">
            <Select onChange={(value) => handleChangeSelect(value)}>
              <Select.Option key={1} value="CONCERT">
                Concerts
              </Select.Option>
              <Select.Option key={2} value="THEATRE">
                Theatre
              </Select.Option>
              <Select.Option key={3} value="SPORT">
                Sport
              </Select.Option>
              <Select.Option key={4} value="OTHER">
                Other
              </Select.Option>
            </Select>
          </Form.Item>
          <h2>Ticket price by category</h2>
          {props.categories.map((category, i) => (
            <Form.Item
              key={i}
              label={category.label}
              name={category.label}
              rules={[
                {
                  required: true,
                  message: "Please input category price!",
                },
              ]}
            >
              <InputNumber
                style={{ clor: "red" }}
                addonAfter="rsd"
                onChange={(value) =>
                  handleChangeCategories(value, category.key)
                }
              />
            </Form.Item>
          ))}

          <div className="App">
            <ImageUploading
              value={images}
              onChange={handleChangeImage}
              maxNumber={1}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageUpdate,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                  <button
                    style={isDragging ? { color: "red" } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Upload
                  </button>
                  &nbsp;
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      <img src={image["data_url"]} alt="" width="100" />
                      <div className="image-item__btn-wrapper">
                        <button onClick={() => onImageUpdate(index)}>
                          Update
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>
          </div>
          <button type="submit" id="submitBtn">
            Send <SendOutlined id="sendBtnArrow" />
          </button>
        </Form>
      </div>
    </>
  );
}

export default CreateForm;
