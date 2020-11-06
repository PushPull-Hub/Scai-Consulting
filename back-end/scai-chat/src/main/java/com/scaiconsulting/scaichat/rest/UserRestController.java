package com.scaiconsulting.scaichat.rest;


import com.scaiconsulting.scaichat.entities.InitialUser;
import com.scaiconsulting.scaichat.entities.User;
import com.scaiconsulting.scaichat.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UserRestController {

    private UserService userService;

    @Autowired
    public UserRestController(UserService theUserService) {
        userService = theUserService;
    }

    // test

    @GetMapping("/test")
    public String confirmFunctionalityOfTheApp() {
        return "From UserRestController , the GET request works fine  time on server is : " + LocalDateTime.now();
    }

    // Create

    @PostMapping("/users")
    public InitialUser createUser(@RequestBody InitialUser initialUser) {
        initialUser.setId(0);
        userService.createUser(initialUser);
        return initialUser;
    }

    // Read

    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/users/{userId}")
    public User getUser(@PathVariable int userId) {
        User theUser = userService.getUser(userId);
        if (theUser == null) {
            throw new RuntimeException("the user with the id : " + userId + " isn't found ");
        }
        return theUser;
    }

    // Update

    @PutMapping("/users")
    public User updateUser(@RequestBody User user) {
        return userService.updateUser(user);
    }

    // Delete

    @DeleteMapping("users/{userId}")
    public String deleteUser(@PathVariable int userId) {
        userService.deleteUser(userId);
        return "user with Id : " + userId + " has been deleted ";
    }

}
