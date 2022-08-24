package com.ftn.eTickets.web.controller;

import com.ftn.eTickets.exceptions.BadRequestException;
import com.ftn.eTickets.model.User;
import com.ftn.eTickets.service.UserService;
import com.ftn.eTickets.web.dto.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/loggedUser")
    public ResponseEntity getOne(Authentication authentication){
        RespUserDto response = userService.findLoggedUser(authentication);
        if(response == null){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }else {
            return new ResponseEntity(response, HttpStatus.OK);
        }
    }

    @PostMapping
    public ResponseEntity createUser(@Valid @RequestBody ReqUserDto requestDto){
        try{
            String id = userService.create(requestDto);
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

    @PostMapping("/changePassword")
    public ResponseEntity changePassword(Authentication authentication, @RequestBody ChangePasswordDto requestDto){
        try {
            userService.changePassword(authentication, requestDto);
            return new ResponseEntity(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(e,HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity updateUser(@PathVariable String id,@RequestBody ReqUserDto reqUserDto){
        try{
            userService.update(id, reqUserDto);
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }catch (BadRequestException e){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

}
