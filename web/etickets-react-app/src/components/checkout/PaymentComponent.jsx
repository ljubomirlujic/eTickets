import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { PaymentService } from "../../services/PaymentService";
import { useNavigate } from "react-router-dom";
import { EventService } from "../../services/EventService";

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

  const bookSeats = async () => {
    const bookObjects = [];
    props.tickets.tickets.forEach((ticket) => {
      for (let key in ticket) {
        if (key == "label") {
          bookObjects.push(ticket[key]);
        }
      }
    });

    const holdToken = JSON.parse(sessionStorage.getItem("seatsio"));
    const paymentData = {
      objects: bookObjects,
      holdToken: holdToken.holdToken,
    };

    EventService.bookSeats(props.tickets.eventId, paymentData);
  };

  const getNumberByCategories = (objects) => {
    const response = [];

    const categories = new Set();
    objects.forEach((object) => {
      categories.add(object["category"]);
    });

    categories.forEach((category) => {
      const filteredCategorieres = objects.filter(
        (object) => object.category == category
      );
      const objectsToSend = {
        category: category,
        numberOfSeats: filteredCategorieres.length,
      };
      response.push(objectsToSend);
    });
    return response;
  };

  const bookBestAvailable = async () => {
    const paymentData = {
      categories: getNumberByCategories(props.tickets.tickets),
    };

    return EventService.bookBestAvailable(props.tickets.eventId, paymentData);
  };

  const createPayment = async (paymentData) => {
    try {
      const response = await PaymentService.createPayment(paymentData);
      if (response.data.status == "succeeded") {
        if (props.bookMode == "bestAvailable") {
          await bookBestAvailable();
        } else {
          await bookSeats();
        }
        navigate("/successPage");
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
          <CheckoutForm
            bookMode={props.bookMode}
            setClientSecret={clientSecret}
            tickets={props.tickets}
          />
        </Elements>
      )}
    </div>
  );
}

export default PaymentComponent;
