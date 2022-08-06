package com.ftn.eTickets.web.dto;

import lombok.Data;

import java.util.List;

@Data
public class PaymentRequest {
    private List<CategoryReqDto> items;
    private String eventId;
    private boolean saveChecked;
    private boolean cardChecked;
}
