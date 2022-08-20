import { SendOutlined } from "@ant-design/icons";
import { isPast } from "date-fns";
import { subDays } from "date-fns/esm";
import React, { useState } from "react";
import { useEffect } from "react";
import ImageUploading from "react-images-uploading";

const defaultEvent = {
  name: "",
  categories: [],
  date: "",
  location: "",
  image: "",
  type: "",
};

function EventForm(props) {
  const [formData, setFormData] = useState(defaultEvent);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [images, setImages] = useState([]);

  const handleChange = (event, prop) => {
    setFormData({
      ...formData,
      [prop]: event.target.value,
    });
  };

  function addOrUpdate(array, item) {
    const index = array.findIndex((_item) => _item.category == item.category);
    if (index > -1) array[index] = item;
    else array.push(item);
  }

  const handleChangeCategories = (event, key, label, priceId) => {
    let updateCategories = [...formData.categories];
    console.log(priceId);
    addOrUpdate(updateCategories, {
      category: key,
      label: label,
      price: event.target.value,
    });
    setFormData({ ...formData, categories: updateCategories });
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

  const setData = (event) => {
    setFormData({
      ...formData,
      name: event.name,
      categories: event.categories,
      date: event.date,
      location: event.location,
      image: event.image.data,
      type: event.type,
    });
  };
  useEffect(() => {
    if (props.event !== undefined) {
      setData(props.event);
    }
  }, [props.event]);

  const validate = (values) => {
    const errors = {};

    if (values.name.trim().length < 3) {
      errors.name = "Name must contain at least 3 letters!";
    }
    if (values.location.trim() === "") {
      errors.location = "Location is required!";
    }
    if (values.date.trim() === "") {
      errors.date = "Date is required!";
    } else if (isPast(subDays(new Date(formData.date), 3))) {
      errors.date = "Date must be at least 3 days from today!";
    }
    if (values.type.trim() === "") {
      errors.type = "Type is required!";
    }
    if (values.image.trim() === "") {
      errors.image = "Image is required!";
    }
    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      props.handleForm(formData);
    }
  }, [formErrors]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(formData));
    setIsSubmit(true);
  };

  console.log(formData);
  return (
    <>
      <div className="event-form">
        <h2>{props.title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-fields">
            <div className="field-name">
              <label>Name: </label>
              <input
                name="name"
                value={formData.name}
                onChange={(event) => handleChange(event, "name")}
              ></input>
            </div>
            <p className="input-error">{formErrors.name}</p>
            <div className="field-location">
              <label>Location: </label>
              <input
                name="location"
                value={formData.location}
                onChange={(event) => handleChange(event, "location")}
              ></input>
            </div>
            <p className="input-error">{formErrors.location}</p>
            <div className="field-date">
              <label>Date: </label>
              <input
                value={formData.date}
                type="datetime-local"
                name="date"
                onChange={(event) => handleChange(event, "date")}
              ></input>
            </div>
            <p className="input-error">{formErrors.date}</p>
            <div className="field-type">
              <label>Type: </label>
              <select
                value={formData.type}
                onChange={(event) => handleChange(event, "type")}
              >
                <option hidden>Select Type</option>
                <option value="CONCERT">Concerts</option>
                <option value="THEATRE">Theatre</option>
                <option value="SPORT">Sport</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <p className="input-error">{formErrors.type}</p>
            <div className="field-categories">
              <label>Ticket price by category: </label>
              {props.categories.map((category, i) => (
                <div className="field-category" key={i}>
                  <label>{category.label}: </label>
                  <input
                    type="number"
                    value={
                      formData.categories[i] !== undefined
                        ? formData.categories[i].price
                        : ""
                    }
                    onChange={(event) =>
                      handleChangeCategories(
                        event,
                        category.key,
                        category.label
                      )
                    }
                  />
                </div>
              ))}
            </div>
            <div
              className="field-image"
              style={{
                display: props.title === "Edit Event" ? "none" : "block",
              }}
            >
              <p className="input-error">{formErrors.image}</p>
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
                        type="button"
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
                            <button
                              type="button"
                              onClick={() => onImageUpdate(index)}
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ImageUploading>
              </div>
            </div>
          </div>
          <button type="submit" id="submitBtn">
            Send <SendOutlined id="sendBtnArrow" />
          </button>
        </form>
      </div>
    </>
  );
}

export default EventForm;
