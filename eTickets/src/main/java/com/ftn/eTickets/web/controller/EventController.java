package com.ftn.eTickets.web.controller;

import com.ftn.eTickets.service.EventService;
import com.ftn.eTickets.web.dto.ReqEventDto;
import com.ftn.eTickets.web.dto.RespEventDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
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
    public ResponseEntity getAll(){
        List<RespEventDto> responseEvents = eventService.findAll();
        return new ResponseEntity(responseEvents, HttpStatus.OK);

    }

    @GetMapping(value = "/{eventKey}")
    public ResponseEntity getOne(@PathVariable String eventKey){
        RespEventDto responseEvent = eventService.findOne(eventKey);
        if(responseEvent == null){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }else {
            return new ResponseEntity(responseEvent, HttpStatus.OK);
        }
    }

    @PostMapping
    public ResponseEntity createEvent(@RequestBody ReqEventDto requestDto, @RequestParam("chartKey") String chartKey){

        String id = eventService.create(requestDto, chartKey);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(id)
                .toUri();

        return ResponseEntity.created(location).build();

    }


}
