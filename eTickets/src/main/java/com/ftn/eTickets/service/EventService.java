package com.ftn.eTickets.service;

import com.ftn.eTickets.exceptions.BadRequestException;
import com.ftn.eTickets.exceptions.NotFoundException;
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
import java.util.UUID;

@Service
public class EventService {

    private final EventRepository eventRepository;

    private final SeatsioClient client = new SeatsioClient(Region.EU, "1b9652d8-26aa-414b-b0d3-eb5176de8bbe");

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<RespEventDto> findAll() {
        List<Event> events = eventRepository.findAll();
        return EventMapper.toRespDtoList(events);
    }

    public RespEventDto findOne(String eventId) {
        Optional<Event> event = eventRepository.findById(eventId);

        return EventMapper.toRespDto(event.orElse(null));
    }

    public String create(ReqEventDto requestDto, String chartKey) throws BadRequestException {
        Event event = EventMapper.toEntity(requestDto);
        String eventKey = client.events.create(chartKey).key;
        event.setEventKey(eventKey);
        Event preservedEvent = eventRepository.save(event);

        return preservedEvent.getId();
    }

    public void update(String id, ReqEventDto requestDto) throws NotFoundException, BadRequestException {
        Optional<Event> getEvent = eventRepository.findById(id);
        if(getEvent == null){
            throw new NotFoundException("Not found entity with id: " + id);
        }
        Event event = EventMapper.toEntity(requestDto);
        event.setId(id);
        event.setEventKey(getEvent.get().getEventKey());
        eventRepository.save(event);
    }

    public boolean delete(String id) {
        Event event = eventRepository.findById(id).orElse(null);
        if(event == null){
            return false;
        }
        client.events.delete(event.getEventKey());
        eventRepository.delete(event);
        return true;
    }


}
