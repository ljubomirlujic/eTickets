package com.ftn.eTickets.service;

import com.ftn.eTickets.exceptions.BadRequestException;
import com.ftn.eTickets.exceptions.NotFoundException;
import com.ftn.eTickets.model.Category;
import com.ftn.eTickets.model.EEventType;
import com.ftn.eTickets.model.Event;
import com.ftn.eTickets.repository.EventRepository;
import com.ftn.eTickets.web.dto.BookSeatsRequest;
import com.ftn.eTickets.web.dto.ReqEventDto;
import com.ftn.eTickets.web.dto.RespEventDto;
import com.ftn.eTickets.web.dto.mapper.EventMapper;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Price;
import com.stripe.model.Product;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import seatsio.Region;
import seatsio.SeatsioClient;
import seatsio.SeatsioException;

import java.util.*;

@Service
public class EventService {

    @Value("${stripe.apikey}")
    private String stripeSecretKey;

    private final EventRepository eventRepository;

    private final SeatsioClient client = new SeatsioClient(Region.EU, "1b9652d8-26aa-414b-b0d3-eb5176de8bbe");

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<RespEventDto> findAll(String selectedType, String searchParam) {
        List<Event> events;
        if(selectedType.trim().equals("") && searchParam.trim().equals("")){
            events = eventRepository.findByOrderByDateAsc();
            return EventMapper.toRespDtoList(events);
        }
        if(!searchParam.trim().equals("") && selectedType.trim().equals("")){
            events = eventRepository.findByNameContainingIgnoreCaseOrderByDateAsc(searchParam);
            return EventMapper.toRespDtoList(events);
        }
        EEventType type = getEventType(selectedType);
        if(type != null && searchParam.trim().equals("")){
            events = eventRepository.findByTypeOrderByDateAsc(type);
            return EventMapper.toRespDtoList(events);
        }else{
            events = eventRepository.findByNameContainingIgnoreCaseAndTypeOrderByDateAsc(searchParam, type);
            return EventMapper.toRespDtoList(events);
        }
    }

    public RespEventDto findOne(String eventId) {
        Optional<Event> event = eventRepository.findById(eventId);

        return EventMapper.toRespDto(event.orElse(null));
    }

    public Event getOne(String eventId) {
        Optional<Event> event = eventRepository.findById(eventId);

        return event.orElse(null);
    }


    public String create(ReqEventDto requestDto, String chartKey) throws BadRequestException {
            Event event = EventMapper.toEntity(requestDto);
            try {
                String productId = createProduct(requestDto.getName());
                event.setProductId(productId);
                event = setPrices(event);
            }
            catch (StripeException e) {
                throw new BadRequestException("Bad request stripe");
            }
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

    public void bookSeats(BookSeatsRequest bookSeatsRequest, String eventId) throws SeatsioException{
        Event event = getOne(eventId);
        try {
            client.events.book(event.getEventKey(), bookSeatsRequest.getObjects(), bookSeatsRequest.getHoldToken());
        }catch (SeatsioException e){
            throw new SeatsioException(e.getMessage());
        }

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

    private String createProduct(String name) throws StripeException {
        Stripe.apiKey = stripeSecretKey;
        Map<String, Object> params = new HashMap<>();
        params.put("name", name);

        Product product = Product.create(params);
        return product.getId();

    }

    private Event setPrices(Event event) throws StripeException {
        Stripe.apiKey = stripeSecretKey;
        Map<String, Object> recurring = new HashMap<>();
        recurring.put("interval", "month");

        Map<String, Object> params = new HashMap<>();
        params.put("currency", "rsd");
        params.put("recurring", recurring);
        params.put("product", event.getProductId());
        for(Category category : event.getCategories()){
            params.put("unit_amount", category.getPrice() * 100L);

            Price price = Price.create(params);
            category.setPriceId(price.getId());

        }
        return event;
    }

    private EEventType getEventType(String selectedType){
        try{
            EEventType type = EEventType.valueOf(selectedType);
            return type;
        }catch (IllegalArgumentException e){
            return null;
        }
    }


}
