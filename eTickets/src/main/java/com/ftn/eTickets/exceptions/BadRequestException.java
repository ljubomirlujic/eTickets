package com.ftn.eTickets.exceptions;

public class BadRequestException extends Exception{

    public BadRequestException(String errorMessage) {
        super(errorMessage);
    }
}
