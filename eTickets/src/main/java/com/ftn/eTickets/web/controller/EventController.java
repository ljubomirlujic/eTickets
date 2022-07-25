package com.ftn.eTickets.web.controller;

import com.ftn.eTickets.exceptions.BadRequestException;
import com.ftn.eTickets.exceptions.NotFoundException;
import com.ftn.eTickets.service.EventService;
import com.ftn.eTickets.web.dto.ReqEventDto;
import com.ftn.eTickets.web.dto.RespEventDto;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public ResponseEntity getAll(){
        List<RespEventDto> responseEvents = eventService.findAll();
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
