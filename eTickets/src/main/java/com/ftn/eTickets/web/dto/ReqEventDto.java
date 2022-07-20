package com.ftn.eTickets.web.dto;

import com.ftn.eTickets.model.EEventType;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.Map;


@Data
@NoArgsConstructor
public class ReqEventDto {

    private String name;
    private LocalDateTime date;
    private String location;
    private EEventType type;
    private Map<String, Long> categories;
    private byte[] image;
}
