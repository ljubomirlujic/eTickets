package com.ftn.eTickets.web.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Data
@NoArgsConstructor
public class ReqUserDto {

    @NotEmpty
    private String name;
    @NotEmpty
    private String surname;
    @Email
    private String email;
    @NotEmpty
    private String password;
    private String address;
    private String city;
    private String state;
    private String zipCode;
    private String phoneNumber;

}
