package com.ftn.eTickets.web.dto;

import lombok.Data;

@Data
public class CategoryReqDto {
    private String category;
    private String label;
    private Long price;
}
