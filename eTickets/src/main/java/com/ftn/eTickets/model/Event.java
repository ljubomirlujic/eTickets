package com.ftn.eTickets.model;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@Document("event")
@Builder
public class Event {

    @Id
    private String id;

    private String name;
    private LocalDateTime date;
    private String location;
    private Binary image;
    private EEventType type;
    private List<Category> categories;
    private String eventKey;
    private String chartKey;
    private String productId;
}
