package com.ftn.eTickets.service;

import com.ftn.eTickets.exceptions.BadRequestException;
import com.ftn.eTickets.exceptions.NotFoundException;
import com.ftn.eTickets.model.Category;
import com.ftn.eTickets.model.EEventType;
import com.ftn.eTickets.model.Event;
import com.ftn.eTickets.repository.EventRepository;
import com.ftn.eTickets.web.dto.*;
import com.ftn.eTickets.web.dto.mapper.EventMapper;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Price;
import com.stripe.model.Product;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import seatsio.Region;
import seatsio.SeatsioClient;
import seatsio.SeatsioException;
import seatsio.events.BestAvailable;
import seatsio.events.BestAvailableResult;
import seatsio.reports.events.EventReportDeepSummaryItem;

import java.time.LocalDate;
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

    public RespPageableEventDto findAll(String eventType, String searchParam, LocalDate dateFrom, LocalDate dateTo, String city, int page) {
        EEventType type;
        Page<Event> events;
        Pageable pageable = PageRequest.of(page, 10);
       if(!eventType.equals("") && !eventType.equals("null")) {
           type = getEventType(eventType);
           events = eventRepository.findEventbyProperties(type, searchParam, dateFrom, dateTo, city, pageable);
       }else{
          events = eventRepository.findEventbyProperties(null, searchParam, dateFrom, dateTo, city, pageable);
       }

       return new RespPageableEventDto(EventMapper.toRespDtoList(events.getContent()), events.getTotalPages());
    }

    public RespEventDto findOne(String eventId) {
        Optional<Event> event = eventRepository.findById(eventId);

        return EventMapper.toRespDto(event.orElse(null));
    }

    public Event getOne(String eventId) {
        Optional<Event> event = eventRepository.findById(eventId);

        return event.orElse(null);
    }

    public Object getAvailableSeatsReport(String eventId){
        Map<String, EventReportDeepSummaryItem> report = client.eventReports.deepSummaryByAvailabilityReason(eventId);
        Object available = report.get("available");
        return available;
    }

    public List<String> findDistinctCities(){
        return eventRepository.findDistinctLocation();
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
        event.setChartKey(chartKey);
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
        event.setChartKey(getEvent.get().getChartKey());
        try {
            String productId = updateProduct(getEvent.get().getProductId(), event.getName());
            event.setProductId(productId);
            event = setPrices(event);
        }
        catch (StripeException e) {
            throw new BadRequestException("Bad request stripe");
        }

        eventRepository.save(event);
    }



    public List<String> bookSeats(BookSeatsRequest bookSeatsRequest, String eventId) throws SeatsioException{
        Event event = getOne(eventId);
        try {
            client.events.book(event.getEventKey(), bookSeatsRequest.getObjects(), bookSeatsRequest.getHoldToken());
            return bookSeatsRequest.getObjects();
        }catch (SeatsioException e){
            bookWithoutHoldToken(bookSeatsRequest, event);
            return bookSeatsRequest.getObjects();
        }

    }

    private void bookWithoutHoldToken(BookSeatsRequest bookSeatsRequest, Event event){
        try {
            client.events.book(event.getEventKey(), bookSeatsRequest.getObjects());
        }catch (SeatsioException ex) {
            throw new SeatsioException(ex.getMessage());
        }
    }

    public List<String> bookBestAvailable(BookBestAvaliableReq bookBestAvaliableReq, String eventId) throws SeatsioException{
        Event event = getOne(eventId);
        List<String> bookedSeats = new ArrayList<>();
        try {
            for(BookCategory category: bookBestAvaliableReq.getCategories()){
             BestAvailableResult result = client.events.book(event.getEventKey(),new BestAvailable(category.getNumberOfSeats(),  Arrays.asList(category.getCategory())));
             for(String seat : result.objects){
                 bookedSeats.add(seat);
             }
            }
            return bookedSeats;
        }catch (SeatsioException e){
            throw new SeatsioException(e.getMessage());
        }

    }


    public void releaseSeats(ReleaseSeatsReq releaseSeatsReq, String eventId) throws SeatsioException{
        Event event = getOne(eventId);
        try {
            client.events.release(event.getEventKey(),releaseSeatsReq.getSeats());
        }catch (SeatsioException e){
            throw new SeatsioException(e.getMessage());
        }

    }


    public boolean delete(String id) {
        Event event = eventRepository.findById(id).orElse(null);
        if(event == null){
            return false;
        }
        try {
            archiveProduct(event.getProductId());

        }catch (StripeException e){
            throw new SeatsioException(e.getMessage());
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

    private String updateProduct(String productId, String name) throws StripeException {
        Stripe.apiKey = stripeSecretKey;
        archiveProduct(productId);
        Map<String, Object> params = new HashMap<>();
        params.put("name", name);

        Product product = Product.create(params);
        return product.getId();
    }

    private void archiveProduct(String productId) throws StripeException {
        Stripe.apiKey = stripeSecretKey;
        Product product =
                Product.retrieve(productId);

        Map<String, Object> params = new HashMap<>();
        params.put("active", false);

        product.update(params);

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
            return EEventType.BAD;
        }
    }


}
