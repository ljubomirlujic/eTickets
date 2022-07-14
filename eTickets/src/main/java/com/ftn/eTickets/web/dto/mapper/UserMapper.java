package com.ftn.eTickets.web.dto.mapper;

import com.ftn.eTickets.model.User;
import com.ftn.eTickets.web.dto.ReqUserDto;
import com.ftn.eTickets.web.dto.RespUserDto;

public class UserMapper {

    public static User toEntity(ReqUserDto requestDto){
        return User.builder()
                .name(requestDto.getName())
                .surname(requestDto.getSurname())
                .email(requestDto.getEmail())
                .address(requestDto.getAddress())
                .city(requestDto.getCity())
                .state(requestDto.getState())
                .phoneNumber(requestDto.getPhoneNumber())
                .zipCode(requestDto.getZipCode())
                .password(requestDto.getPassword())
                .build();
    }

    public static RespUserDto toRespDto(User user){
        if(user == null){
            return null;
        }
        return RespUserDto.builder()
                .id(user.getId())
                .name(user.getName())
                .surname(user.getSurname())
                .email(user.getEmail())
                .address(user.getAddress())
                .city(user.getCity())
                .state(user.getState())
                .phoneNumber(user.getPhoneNumber())
                .zipCode(user.getZipCode())
                .build();
    }


}
