package com.ftn.eTickets.web.dto;

import lombok.Builder;
import lombok.Data;
import org.bson.types.Binary;
import java.time.LocalDateTime;
import java.util.Map;

@Data
@Builder
public class RespEventDto {

    private String id;
    private String name;
    private LocalDateTime date;
    private String location;
    private Binary image;
    private Map<String, Long> categories;
    private String eventKey;
}
