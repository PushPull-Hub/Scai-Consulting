package com.scaiconsulting.scaichat.controllers;


import com.scaiconsulting.scaichat.entities.Account;
import com.scaiconsulting.scaichat.entities.Profile;
import com.scaiconsulting.scaichat.entities.User;
import com.scaiconsulting.scaichat.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "http://localhost:8080")
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService theUserService) {
        userService = theUserService;
    }

    // Create

    @PostMapping("/users")
    public Account createUser(@RequestBody Account account) {
        account.setId(0);
        userService.createUser(account);
        return account;
    }

    // Read

    @GetMapping("/users/{email}/{password}")
    public User getUser(@PathVariable String email, @PathVariable String password) {
        User theUser = userService.getUser(email, password);
        if (theUser == null) {
            throw new RuntimeException("the user with email " + email + "isn't found ");
        }
        return theUser;
    }

    @GetMapping("/profiles")
    public List<Profile> getProfiles() {
        return userService.getProfiles();
    }

    @GetMapping("/profiles/{profileId}")
    public Profile getProfile(@PathVariable int profileId) {
        return userService.getProfile(profileId);
    }

    // Update

    @PutMapping("/users")
    public User updateUser(@RequestBody User user) {
        return userService.updateUser(user);
    }

    @PutMapping("/profiles")
    public Profile updateUserById(@RequestBody Profile profile) {
        return userService.updateProfile(profile);

    }


}
