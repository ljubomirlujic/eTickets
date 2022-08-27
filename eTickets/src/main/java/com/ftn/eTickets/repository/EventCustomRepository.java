package com.ftn.eTickets.repository;

import com.ftn.eTickets.model.EEventType;
import com.ftn.eTickets.model.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;

public interface EventCustomRepository {

    Page<Event> findEventbyProperties(EEventType eventType, String searchParam, LocalDate dateFrom, LocalDate dateTo, String city, Pageable page);
}
