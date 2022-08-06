package com.ftn.eTickets.model;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("user")
@Builder
public class User {

    @Id
    private String id;

    private String name;
    private String surname;
    private String email;
    private String address;
    private String city;
    private String state;
    private String zipCode;
    private String phoneNumber;
    private String password;
    private EUserRole role;
    private String customerId;


}
