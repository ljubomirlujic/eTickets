package com.ftn.eTickets.web.dto;

import lombok.Data;

@Data
public class JwtAuthenticationRequest {
    private String email;
    private String password;
}
