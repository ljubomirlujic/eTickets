package com.ftn.eTickets.service;

import com.ftn.eTickets.model.User;
import com.ftn.eTickets.repository.UserRepository;
import com.ftn.eTickets.web.dto.ReqUserDto;
import com.ftn.eTickets.web.dto.mapper.UserMapper;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String create(ReqUserDto requestDto){
        User preservedUser = userRepository.save(UserMapper.toEntity(requestDto));

        return preservedUser.getId();
    }
}
