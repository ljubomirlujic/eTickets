package com.ftn.eTickets.web.controller;


import com.ftn.eTickets.service.PaymentService;
import com.ftn.eTickets.web.dto.PaymentRequest;
import com.ftn.eTickets.web.dto.PaymentResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentMethod;
import com.stripe.model.PaymentMethodCollection;
import com.stripe.model.PaymentSourceCollection;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping("/paymentMethods")
    public ResponseEntity getCustomerPaymentMethods(Authentication authentication){
        try{
            List<PaymentMethod> paymentMethods = paymentService.getPaymentMethods(authentication);
            return new ResponseEntity(paymentMethods, HttpStatus.OK);
        }catch (StripeException e){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

    }

    @PostMapping
    private ResponseEntity createPayment(@RequestBody PaymentRequest paymentRequest, Authentication authentication){
        try {
            PaymentResponse paymentResponse = paymentService.createPayment(paymentRequest, authentication);
            return new ResponseEntity(paymentResponse, HttpStatus.CREATED);
        }catch (StripeException e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }
}
