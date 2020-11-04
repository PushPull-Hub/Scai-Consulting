package com.scaiconsulting.scaichat.rest;


import com.scaiconsulting.scaichat.DAOImplementations.UserDaoImplementation;
import com.scaiconsulting.scaichat.DAOs.UserDao;
import com.scaiconsulting.scaichat.entities.User;
import com.scaiconsulting.scaichat.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UserRestController {

  private UserService userService ;

    @Autowired
    public UserRestController (UserService theUserService) {
        userService = theUserService;
    }


    @GetMapping("/test")
    public String confirmFunctionalityOfTheApp () {
        return "hola From UserRestController , the GET request works fine  time on server is : " + LocalDateTime.now() ;
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.getUsers();
    }


}
