package com.ftn.eTickets.web.dto;

import com.ftn.eTickets.model.EUserRole;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
public class RespUserDto {

    private String id;
    private String name;
    private String surname;
    private String email;
    private String address;
    private String city;
    private String state;
    private String zipCode;
    private String phoneNumber;
    private EUserRole role;
}
