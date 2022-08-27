package com.ftn.eTickets.web.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class RespPageableEventDto {

    private List<RespEventDto> events;
    int pageCount;
}
