import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { PaymentService } from "../../services/PaymentService";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51LRgnQExcTORqL3tTRvdoY4IvPKiT60AjNKKKv5XIr321Q1hv49qMzCLvNsNhUfule0Soup5jQKYMWRY1p5hhVlA00ZLX5qngd"
);
function PaymentComponent(props) {
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");

  const items = {
    items: props.tickets.tickets,
    eventId: props.tickets.eventId,
    saveChecked: props.savePaymentChecked,
    cardChecked: props.cardChecked,
  };
  console.log(items);

  const createPayment = async (paymentData) => {
    try {
      const response = await PaymentService.createPayment(paymentData);
      console.log(response);
      if (response.data.status == "succeeded") {
        sessionStorage.removeItem("seatsio");
        navigate("/");
      }
      setClientSecret(response.data.clientSecret);
    } catch {}
  };

  useEffect(() => {
    createPayment(items);
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm setClientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  );
}

export default PaymentComponent;
