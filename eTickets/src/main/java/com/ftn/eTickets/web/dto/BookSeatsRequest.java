package com.ftn.eTickets.web.dto;

import lombok.Data;

import java.util.List;

@Data
public class BookSeatsRequest {

    private List<String> objects;
    private String holdToken;

}
