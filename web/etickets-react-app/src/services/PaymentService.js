import AxiosClient from "./AxiosClient";


const baseURL = "http://localhost:8080/api/payments";

export const PaymentService = {
    createPayment,
    getLoggedCustomerPaymentMethods

}


async function createPayment(paymentData) {
    return await AxiosClient.post(baseURL, paymentData);
}

async function getLoggedCustomerPaymentMethods() {
    return await AxiosClient.get(baseURL + "/paymentMethods");
}