package com.ftn.eTickets.web.dto;

import com.ftn.eTickets.model.Category;
import com.ftn.eTickets.model.EEventType;
import lombok.Builder;
import lombok.Data;
import org.bson.types.Binary;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class RespEventDto {

    private String id;
    private String name;
    private LocalDateTime date;
    private String location;
    private Binary image;
    private EEventType type;
    private List<Category> categories;
    private String eventKey;
    private String chartKey;
}
