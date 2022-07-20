package com.ftn.eTickets.service;

import com.ftn.eTickets.model.Event;
import com.ftn.eTickets.repository.EventRepository;
import com.ftn.eTickets.web.dto.ReqEventDto;
import com.ftn.eTickets.web.dto.RespEventDto;
import com.ftn.eTickets.web.dto.mapper.EventMapper;
import org.springframework.stereotype.Service;
import seatsio.Region;
import seatsio.SeatsioClient;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<RespEventDto> findAll() {
        List<Event> events = eventRepository.findAll();
        return EventMapper.toRespDtoList(events);
    }

    public RespEventDto findOne(String eventKey) {
        Optional<Event> event = eventRepository.findFirstByEventKey(eventKey);

        return EventMapper.toRespDto(event.orElse(null));
    }

    public String create(ReqEventDto requestDto, String chartKey) {
        SeatsioClient client = new SeatsioClient(Region.EU, "1b9652d8-26aa-414b-b0d3-eb5176de8bbe");
        Event event = EventMapper.toEntity(requestDto);
        String eventKey = client.events.create(chartKey).key;
        event.setEventKey(eventKey);
        Event preservedEvent = eventRepository.save(event);

        return preservedEvent.getId();
    }


}
