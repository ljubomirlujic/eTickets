package com.ftn.eTickets.repository;

import com.ftn.eTickets.model.Event;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EventRepository extends MongoRepository<Event, String> {

    Optional<Event> findFirstByEventKey(String eventKey);
}
