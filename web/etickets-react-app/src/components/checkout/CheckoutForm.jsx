import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { EventService } from "../../services/EventService";
import { useNavigate } from "react-router-dom";

function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const bookSeats = () => {
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

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = props.clientSecret;

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `http://localhost:3000/successPage?paymentStatus=success`,
        },
        redirect: "if_required",
      })
      .then(() => {
        bookSeats();
        navigate("/successPage");
      })
      .catch((error) => {
        setMessage(error);
        console.log(error);
      });

    setIsLoading(false);
  };
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}

export default CheckoutForm;
