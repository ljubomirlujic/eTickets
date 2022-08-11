import React from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
function CategoryItem(props) {
  const [numValue, setNumValue] = useState(0);

  const availability = props.availability;

  const ticket = {
    label: props.category.category,
    category: props.category.label,
    price: props.category.price,
  };

  const handlePlus = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart.tickets.length < 6) {
      cart.tickets.push(ticket);
      localStorage.setItem("cart", JSON.stringify(cart));
      setNumValue((numValue) => {
        return numValue + 1;
      });
    }
  };

  console.log(JSON.parse(localStorage.getItem("cart")));
  const handleMinus = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const newTicketsArray = [...cart.tickets];
    const index = newTicketsArray.findIndex(
      (ticket) => ticket.category == props.category.category
    );
    newTicketsArray.splice(index, 1);
    cart.tickets = newTicketsArray;
    localStorage.setItem("cart", JSON.stringify(cart));
    setNumValue((numValue) => {
      if (numValue > 0) {
        return numValue - 1;
      } else {
        return numValue;
      }
    });
  };

  return (
    <div className="category-item">
      <div className="left">
        <h2>Category name: {props.category.label}</h2>
        <h4>Price: {props.category.price}rsd</h4>
        <h4>Number of available seats:</h4>
        <h1>
          {" "}
          {availability != undefined
            ? availability[props.category.label].count
            : ""}
        </h1>
      </div>
      <div>
        <div className="number-input">
          <button className="minus" onClick={handleMinus}>
            <MinusOutlined />
          </button>
          <p className="quantity">{numValue}</p>
          <button className="plus" onClick={handlePlus}>
            <PlusOutlined />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryItem;
