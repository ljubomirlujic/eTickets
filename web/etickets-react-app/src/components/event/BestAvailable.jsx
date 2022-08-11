import { Button } from "antd";
import React from "react";
import { useEffect } from "react";
import CategoryItem from "./CategoryItem";
import { Link } from "react-router-dom";
import { SendOutlined } from "@ant-design/icons";

function BestAvailable(props) {
  const categories = props.event.categories;
  const availability = props.availableReport.byCategoryLabel;

  const checkoutTicket = {
    eventId: props.event.id,
    eventName: props.event.name,
    eventDate: props.event.date,
    tickets: [],
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(checkoutTicket));
  }, [props]);

  return (
    <div className="best-available-container">
      <div className="best-available-category-picker">
        {Object.keys(categories).length != 0
          ? categories.map((category, i) => (
              <CategoryItem
                key={i}
                category={category}
                availability={availability}
              />
            ))
          : ""}
      </div>
      <div className="continue-btn-container">
        <Button className="ant-btn-primary">
          <Link to={"/checkout?mode=bestAvailable"}>
            CONTINUE <SendOutlined id="sendBtnArrow" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default BestAvailable;
