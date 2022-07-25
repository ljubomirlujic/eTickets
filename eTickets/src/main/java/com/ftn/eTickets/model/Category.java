package com.ftn.eTickets.model;


import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
public class Category {

    private String category;
    private Long price;
}