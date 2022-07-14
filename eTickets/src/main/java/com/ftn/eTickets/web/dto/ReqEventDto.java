package com.ftn.eTickets.web.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.Binary;
import java.time.LocalDateTime;


@Data
@NoArgsConstructor
public class ReqEventDto {

    private String name;
    private LocalDateTime date;
    private String location;
    private byte[] image;
}
