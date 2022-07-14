package com.ftn.eTickets.model;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

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
    private String eventKey;
}
