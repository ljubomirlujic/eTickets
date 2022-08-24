package com.ftn.eTickets.service;

import com.ftn.eTickets.exceptions.BadRequestException;
import com.ftn.eTickets.model.EUserRole;
import com.ftn.eTickets.model.User;
import com.ftn.eTickets.repository.UserRepository;
import com.ftn.eTickets.web.dto.ChangePasswordDto;
import com.ftn.eTickets.web.dto.ReqUserDto;
import com.ftn.eTickets.web.dto.RespUserDto;
import com.ftn.eTickets.web.dto.mapper.UserMapper;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.param.CustomerCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Value("${stripe.apikey}")
    private String stripeSecretKey;

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User findOneByEmail(String email){
        Optional<User> user = userRepository.findFirstByEmail(email);
        return user.orElse(null);
    }

    public RespUserDto findLoggedUser(Authentication authentication){
        User user = findOneByEmail(authentication.getName());
        return UserMapper.toRespDto(user);
    }

    public String create(ReqUserDto requestDto) throws BadRequestException {
        User user = UserMapper.toEntity(requestDto);
        try{
            user.setCustomerId(createStripeCustomer(user));
        }catch (StripeException e){
            throw new BadRequestException("Stripe exception");
        }
        user.setPassword(passwordEncoder.encode((requestDto.getPassword())));
        user.setRole(EUserRole.CUSTOMER);
        User preservedUser = userRepository.save(user);

        return preservedUser.getId();
    }

    public void update(String id, ReqUserDto reqUserDto) throws BadRequestException {
        User user = userRepository.findById(id).orElse(null);
        if(user == null){
            throw new BadRequestException("User doesn't exist");
        }
        User newData = UserMapper.toEntity(reqUserDto);
        newData.setId(user.getId());
        newData.setPassword(user.getPassword());
        newData.setEmail(user.getEmail());
        newData.setCustomerId(user.getCustomerId());
        newData.setRole(user.getRole());

        userRepository.save(newData);

    }

    public void changePassword(Authentication authentication, ChangePasswordDto requestDto) throws BadRequestException {
        User user = userRepository.findFirstByEmail(authentication.getName()).get();
        if(user == null){
            throw new BadRequestException("user does not exist");
        }
        if(passwordEncoder.matches(requestDto.getOldPassword(), user.getPassword())){
            user.setPassword(passwordEncoder.encode(requestDto.getNewPassword()));
            userRepository.save(user);
        }else{
            throw new BadRequestException("wrong password");
        }

    }

    private String createStripeCustomer(User user) throws StripeException {
        Stripe.apiKey = stripeSecretKey;

        CustomerCreateParams params =
                CustomerCreateParams.builder()
                        .setEmail(user.getEmail())
                        .setBalance(2000000L)
                        .setName(user.getName())
                        .setPhone(user.getPhoneNumber())
                        .build();

        Customer customer = Customer.create(params);

        return customer.getId();
    }
}
