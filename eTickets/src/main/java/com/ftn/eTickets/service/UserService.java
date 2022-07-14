package com.ftn.eTickets.service;

import com.ftn.eTickets.model.EUserRole;
import com.ftn.eTickets.model.User;
import com.ftn.eTickets.repository.UserRepository;
import com.ftn.eTickets.web.dto.ReqUserDto;
import com.ftn.eTickets.web.dto.mapper.UserMapper;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findOneByEmail(String email){
        Optional<User> user = userRepository.findFirstByEmail(email);
        return user.orElse(null);
    }

    public String create(ReqUserDto requestDto){
        User user = UserMapper.toEntity(requestDto);
        user.setRole(EUserRole.CUSTOMER);
        User preservedUser = userRepository.save(user);

        return preservedUser.getId();
    }
}
