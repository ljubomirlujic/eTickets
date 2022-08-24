package com.ftn.eTickets.web.dto;

import lombok.Data;

@Data
public class ChangePasswordDto {

    private String oldPassword;
    private String newPassword;
}
