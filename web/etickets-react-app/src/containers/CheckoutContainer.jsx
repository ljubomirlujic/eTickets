import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import CheckoutView from "../components/checkout/CheckoutView";
import { PaymentService } from "../services/PaymentService";

function CheckoutContainer() {
  const [customerPaymentMethods, setCustomerPaymentMethods] = useState([]);

  const getLoggedCustomerPaymentMethods = async () => {
    try {
      const response = await PaymentService.getLoggedCustomerPaymentMethods();
      setCustomerPaymentMethods(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getLoggedCustomerPaymentMethods();
  }, []);
  return <CheckoutView customerPaymentMethod={customerPaymentMethods[0]} />;
}

export default CheckoutContainer;
