package com.ftn.eTickets.service;

import com.ftn.eTickets.model.Event;
import com.ftn.eTickets.model.User;
import com.ftn.eTickets.web.dto.CategoryReqDto;
import com.ftn.eTickets.web.dto.PaymentRequest;
import com.ftn.eTickets.web.dto.PaymentResponse;
import com.stripe.Stripe;
import com.stripe.exception.CardException;
import com.stripe.exception.StripeException;
import com.stripe.model.*;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.PaymentMethodListParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PaymentService {

    @Value("${stripe.apikey}")
    private String stripeSecretKey;

    private final UserService userService;

    private final EventService eventService;

    public PaymentService(UserService userService, EventService eventService) {
        this.userService = userService;
        this.eventService = eventService;
    }

    public PaymentIntent chargeCustomer(String customerId, Long amount) throws StripeException {

        PaymentMethodListParams listParams = new PaymentMethodListParams.Builder().setCustomer(customerId)
                .setType(PaymentMethodListParams.Type.CARD).build();
        PaymentMethodCollection paymentMethods = PaymentMethod.list(listParams);

        PaymentIntentCreateParams createParams = new PaymentIntentCreateParams.Builder().setCurrency("rsd")
                .setAmount(amount)
                .setPaymentMethod(paymentMethods.getData().get(0).getId())
                .setCustomer(customerId)
                .setConfirm(true)
                .setOffSession(true)
                .build();
        try {
            PaymentIntent paymentIntent = PaymentIntent.create(createParams);
            return paymentIntent;

        } catch (CardException e) {
            System.out.println("Error code is : " + e.getCode());
            String paymentIntentId = e.getStripeError().getPaymentIntent().getId();
            PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);
            System.out.println(paymentIntent.getId());
            return paymentIntent;
        }
    }


    public List<PaymentMethod>  getPaymentMethods(Authentication authentication) throws StripeException {
        Stripe.apiKey = stripeSecretKey;
        Customer customer = getLoggedCustomer(authentication);

        Map<String, Object> params = new HashMap<>();
        params.put("type", "card");

        PaymentMethodCollection paymentMethods =
                customer.listPaymentMethods(params);

        return paymentMethods.getData();

    }

    private void deletePaymentMethods(Authentication authentication) throws StripeException {
        List<PaymentMethod> paymentMethods = getPaymentMethods(authentication);

        for(PaymentMethod paymentMethod : paymentMethods){
            paymentMethod.detach();
        }

    }

    public PaymentResponse createPayment(PaymentRequest paymentRequest, Authentication authentication) throws StripeException {
        Stripe.apiKey = stripeSecretKey;
        Customer customer = getLoggedCustomer(authentication);
        List<PaymentMethod> paymentMethods = getPaymentMethods(authentication);

        PaymentResponse paymentResponse = new PaymentResponse();


        if(paymentRequest.isCardChecked()) {
          PaymentIntent paymentIntent = chargeCustomer(customer.getId(), calculateOrderAmount(paymentRequest.getItems()));
            paymentResponse.setStatus(paymentIntent.getStatus());
            return paymentResponse;

        }
        if(paymentRequest.isSaveChecked()  && paymentMethods.isEmpty()){
            PaymentIntentCreateParams params =
                    PaymentIntentCreateParams.builder()
                            .setCustomer(customer.getId())
                            .setSetupFutureUsage(PaymentIntentCreateParams.SetupFutureUsage.OFF_SESSION)
                            .setAmount(calculateOrderAmount(paymentRequest.getItems()))
                            .setCurrency("rsd")
                            .setAutomaticPaymentMethods(
                                    PaymentIntentCreateParams.AutomaticPaymentMethods
                                            .builder()
                                            .setEnabled(true)
                                            .build()
                            )
                            .build();

            PaymentIntent paymentIntent = PaymentIntent.create(params);
            paymentResponse.setClientSecret(paymentIntent.getClientSecret());
            paymentResponse.setStatus(paymentIntent.getStatus());
        }else if(paymentRequest.isSaveChecked() && !paymentMethods.isEmpty()){
            deletePaymentMethods(authentication);

            PaymentIntentCreateParams params =
                    PaymentIntentCreateParams.builder()
                            .setCustomer(customer.getId())
                            .setSetupFutureUsage(PaymentIntentCreateParams.SetupFutureUsage.OFF_SESSION)
                            .setAmount(calculateOrderAmount(paymentRequest.getItems()))
                            .setCurrency("rsd")
                            .setAutomaticPaymentMethods(
                                    PaymentIntentCreateParams.AutomaticPaymentMethods
                                            .builder()
                                            .setEnabled(true)
                                            .build()
                            )
                            .build();

            PaymentIntent paymentIntent = PaymentIntent.create(params);
            paymentResponse.setClientSecret(paymentIntent.getClientSecret());
            paymentResponse.setStatus(paymentIntent.getStatus());
        }
        else{
            PaymentIntentCreateParams params =
                    PaymentIntentCreateParams.builder()
                            .setCustomer(customer.getId())
                            .setAmount(calculateOrderAmount(paymentRequest.getItems()))
                            .setCurrency("rsd")
                            .setAutomaticPaymentMethods(
                                    PaymentIntentCreateParams.AutomaticPaymentMethods
                                            .builder()
                                            .setEnabled(true)
                                            .build()
                            )
                            .build();

            PaymentIntent paymentIntent = PaymentIntent.create(params);
            paymentResponse.setClientSecret(paymentIntent.getClientSecret());
            paymentResponse.setStatus(paymentIntent.getStatus());

        }


        return paymentResponse;


    }

    private long calculateOrderAmount(List<CategoryReqDto> items) {
        long sum = 0;
        for(CategoryReqDto item : items){
            sum+=item.getPrice();
        }
        sum*=100;

        return sum;
    }

    private Customer getLoggedCustomer(Authentication authentication) throws StripeException {

        User user =  userService.findOneByEmail(authentication.getName());
        Customer customer = Customer.retrieve(user.getCustomerId());
        return customer;
    }

}
