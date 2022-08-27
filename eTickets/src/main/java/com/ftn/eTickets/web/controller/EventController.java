package com.ftn.eTickets.web.controller;

import com.ftn.eTickets.exceptions.BadRequestException;
import com.ftn.eTickets.exceptions.NotFoundException;
import com.ftn.eTickets.service.EventService;
import com.ftn.eTickets.web.dto.*;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import seatsio.SeatsioException;

import javax.validation.Valid;
import java.net.URI;
import java.time.LocalDate;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public ResponseEntity getAll(@RequestParam(name = "eventType", required = false, defaultValue = "")String eventType,
                                 @RequestParam(name = "searchParam", required = false, defaultValue = "")String searchParam,
                                 @RequestParam(name = "dateFrom", required = false, defaultValue = "") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                             LocalDate dateFrom,
                                 @RequestParam(name = "dateTo", required = false, defaultValue = "") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                             LocalDate dateTo,
                                 @RequestParam(name = "city", required = false, defaultValue = "")String city,
                                 @RequestParam(defaultValue = "0") Integer page){
        RespPageableEventDto responseEvents = eventService.findAll(eventType, searchParam, dateFrom, dateTo, city, page);
        return new ResponseEntity(responseEvents, HttpStatus.OK);

    }

    @GetMapping(value = "/{id}")
    public ResponseEntity getOne(@PathVariable String id){
        RespEventDto responseEvent = eventService.findOne(id);
        if(responseEvent == null){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }else {
            return new ResponseEntity(responseEvent, HttpStatus.OK);
        }
    }

    @GetMapping("/{eventId}/availableSeats")
    public ResponseEntity getAvailableSeatsReport(@PathVariable String eventId){
        Object response = eventService.getAvailableSeatsReport(eventId);
        if(response == null){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }else {
            return new ResponseEntity(response, HttpStatus.OK);
        }
    }

    @GetMapping("/cities")
    public ResponseEntity getEventCities(){
        List<String> response = eventService.findDistinctCities();
        if(response == null){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }else {
            return new ResponseEntity(response, HttpStatus.OK);
        }
    }



    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity createEvent(@Valid @RequestBody ReqEventDto requestDto, @RequestParam("chartKey") String chartKey)  {
        try {
            String id = eventService.create(requestDto, chartKey);
            URI location = ServletUriComponentsBuilder
                    .fromCurrentRequest()
                    .path("/{id}")
                    .buildAndExpand(id)
                    .toUri();

            return ResponseEntity.created(location).build();
        }catch (BadRequestException e){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping(value = "/{id}")
    public ResponseEntity updateEvent(@PathVariable String id,@Valid @RequestBody ReqEventDto requestDto) {
        try {
            eventService.update(id, requestDto);
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }catch (NotFoundException e){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }catch (BadRequestException e){
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }

    @PutMapping("/event/{eventId}/bookSeats")
    public ResponseEntity bookSeats(@RequestBody BookSeatsRequest bookSeatsRequest, @PathVariable String eventId){
        try{
            eventService.bookSeats(bookSeatsRequest, eventId);
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }catch (SeatsioException e){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/{eventId}/bookBestAvailable")
    public ResponseEntity bookBestAvailable(@RequestBody BookBestAvaliableReq bookBestAvailable, @PathVariable String eventId){
        try{
            List<String> bookedSeats = eventService.bookBestAvailable(bookBestAvailable, eventId);
            return new ResponseEntity(bookedSeats, HttpStatus.OK);
        }catch (SeatsioException e){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/{eventId}/releaseSeats")
    public ResponseEntity bookBestAvailable(@RequestBody ReleaseSeatsReq releaseSeatsReq, @PathVariable String eventId){
        try{
             eventService.releaseSeats(releaseSeatsReq, eventId);
            return new ResponseEntity(HttpStatus.OK);
        }catch (SeatsioException e){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping(value = "/{id}")
    public ResponseEntity deleteEvent(@PathVariable String id){
        boolean deleted = eventService.delete(id);
        if(deleted){
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }else{
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }


}
