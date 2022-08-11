package com.ftn.eTickets.web.dto;

import lombok.Data;

import java.util.List;

@Data
public class ReleaseSeatsReq {
    private List<String> seats;
}
