package com.ftn.eTickets.web.dto.mapper;

import com.ftn.eTickets.exceptions.BadRequestException;
import com.ftn.eTickets.model.EEventType;
import com.ftn.eTickets.model.Event;
import com.ftn.eTickets.web.dto.ReqEventDto;
import com.ftn.eTickets.web.dto.RespEventDto;
import org.apache.catalina.LifecycleState;
import org.bson.types.Binary;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class EventMapper {

    public static Event toEntity(ReqEventDto requestDto) throws BadRequestException {
        if(requestDto.getDate().minusDays(3).isBefore(LocalDateTime.now())){
            throw new BadRequestException("Date must be at least 3 days from today");
        }
        try{
            EEventType.valueOf(requestDto.getType().toString());
        }catch (Exception e){
            throw new BadRequestException("Bad type");
        }
        if(requestDto.getImage().length == 0){
            throw new BadRequestException("Image can't be empty");
        }
        return Event.builder()
                .name(requestDto.getName())
                .date(requestDto.getDate())
                .location(requestDto.getLocation())
                .image(new Binary(requestDto.getImage()))
                .type(requestDto.getType())
                .categories(requestDto.getCategories())
                .build();
    }

    public static RespEventDto toRespDto(Event event){
        if(event == null){
            return null;
        }
        return RespEventDto.builder()
                .id(event.getId())
                .name(event.getName())
                .date(event.getDate())
                .location(event.getLocation())
                .image(event.getImage())
                .categories(event.getCategories())
                .eventKey(event.getEventKey())
                .chartKey(event.getChartKey())
                .type(event.getType())
                .build();
    }

    public static List<RespEventDto> toRespDtoList(List<Event> events){
        List<RespEventDto> eventDtos = new ArrayList<>();
        for(Event event : events){
            RespEventDto eventDto = toRespDto(event);
            eventDtos.add(eventDto);
        }

        return eventDtos;
    }
}
