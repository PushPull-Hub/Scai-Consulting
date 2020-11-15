package com.scaiconsulting.scaichat.controllers;


import com.scaiconsulting.scaichat.DTO.Account;
import com.scaiconsulting.scaichat.entities.Profile;
import com.scaiconsulting.scaichat.entities.User;
import com.scaiconsulting.scaichat.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService theUserService) {
        userService = theUserService;
    }

    // Create

    @PostMapping("/profiles")
    public Account createAccount(@RequestBody Account account) {
        userService.createAccount(account);
        return account;
    }

    // Read

    @GetMapping("/profiles/{email}/{password}")
    public Profile getProfile(@PathVariable String email, @PathVariable String password) {
        Profile theProfile = userService.getProfile(email, password);
        if (theProfile == null) {
            throw new RuntimeException("the Profile  with email " + email + "isn't found ");
        }
        return theProfile ;
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/users/{userId}")
    public User getUserById(@PathVariable int userId) {
        return userService.getUser(userId);
    }

    // Update

    @PutMapping("/users")
    public User updateUser(@RequestBody User user) {
        return userService.updateUser(user);
    }

    @PutMapping("/profiles")
    public Profile updateProfile(@RequestBody Profile profile) {
        return userService.updateProfile(profile);

    }


}
