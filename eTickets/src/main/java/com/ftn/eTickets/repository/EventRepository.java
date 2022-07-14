package com.ftn.eTickets.repository;

import com.ftn.eTickets.model.Event;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends MongoRepository<Event, String> {

    Event findFirstByEventKey(String eventKey);
}
