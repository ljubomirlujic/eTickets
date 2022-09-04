package com.ftn.eTickets.web.dto;

import lombok.Data;

import java.util.List;

@Data
public class SendMailTicketsReq {
    private List<String> bookedSeats;
}
