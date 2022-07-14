package com.ftn.eTickets.web.dto.mapper;

import com.ftn.eTickets.model.Event;
import com.ftn.eTickets.web.dto.ReqEventDto;
import com.ftn.eTickets.web.dto.RespEventDto;
import org.apache.catalina.LifecycleState;
import org.bson.types.Binary;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

public class EventMapper {

    public static Event toEntity(ReqEventDto requestDto){
        return Event.builder()
                .name(requestDto.getName())
                .date(requestDto.getDate())
                .location(requestDto.getLocation())
                .image(new Binary(requestDto.getImage()))
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
                .eventKey(event.getEventKey())
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
