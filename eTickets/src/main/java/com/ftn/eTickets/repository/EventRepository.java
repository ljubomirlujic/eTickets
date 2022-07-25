package com.ftn.eTickets.repository;

import com.ftn.eTickets.model.EEventType;
import com.ftn.eTickets.model.Event;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends MongoRepository<Event, String> {

    List<Event> findByOrderByDateAsc();

    List<Event> findByTypeOrderByDateAsc(EEventType type);
}
