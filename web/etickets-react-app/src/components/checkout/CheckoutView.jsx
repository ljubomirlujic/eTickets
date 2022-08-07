import React from "react";
import { Tabs, Button } from "antd";
import CheckoutPreview from "./CheckoutPreview";
import { useState } from "react";
import PaymentComponent from "./PaymentComponent";
import { CreditCardFilled } from "@ant-design/icons";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { TokenService } from "../../services/TokenService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CheckoutView(props) {
  const { TabPane } = Tabs;
  const [activeKey, setActiveKey] = useState("1");
  const [savePaymentChecked, setSavePaymentChecked] = useState(false);
  const [cardChecked, setCardChecked] = useState(false);
  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  const tickets = JSON.parse(localStorage.getItem("cart"));

  const onKeyChange = (key) => setActiveKey(key);

  const isMethodSaved = (customerPaymentMethod) => {
    if (customerPaymentMethod) {
      return customerPaymentMethod.card.last4;
    }
    return false;
  };

  const handleDisableSaveCheckbox = () => {
    if (token != null) {
      return false;
    }
    return true;
  };

  const handleSaveCheckBox = (event) => {
    setSavePaymentChecked(event.target.checked);
  };

  const handleCardCheckBox = (event) => {
    setCardChecked(event.target.checked);
  };

  const handleClickNext = () => {
    if (token == null) {
      navigate("/login");
    } else {
      onKeyChange("3");
    }
  };

  useEffect(() => {
    setToken(TokenService.getToken());
  }, [token]);

  return (
    <div className="card-container">
      <Tabs
        type="card"
        centered="true"
        defaultActiveKey="1"
        activeKey={activeKey}
        onChange={onKeyChange}
      >
        <TabPane tab="Preview" key="1">
          <div className="preview-tab">
            <CheckoutPreview
              tickets={tickets}
              customerPaymentMethod={props.customerPaymentMethod}
            />

            <div className="checkout-previev-checkboxes">
              <Checkbox
                onChange={handleSaveCheckBox}
                disabled={handleDisableSaveCheckbox()}
              >
                <p>Save payment info</p>
              </Checkbox>
              <Checkbox
                onChange={handleCardCheckBox}
                disabled={
                  isMethodSaved(props.customerPaymentMethod) === false
                    ? true
                    : false
                }
              >
                <p>
                  <CreditCardFilled id="cardIcon" /> **** **** ****
                  {isMethodSaved(props.customerPaymentMethod)}
                </p>
              </Checkbox>
            </div>
          </div>
          <Button onClick={handleClickNext}>NEXT</Button>
        </TabPane>

        <TabPane tab="Customer data" key="2" disabled></TabPane>
        <TabPane tab="Payment" key="3" disabled>
          <PaymentComponent
            tickets={tickets}
            savePaymentChecked={savePaymentChecked}
            cardChecked={cardChecked}
          />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default CheckoutView;
