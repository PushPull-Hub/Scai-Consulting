package com.scaiconsulting.scaichat.controllers;

import com.scaiconsulting.scaichat.configurations.IdExtractor;
import com.scaiconsulting.scaichat.entities.Profile;
import com.scaiconsulting.scaichat.entities.User;
import com.scaiconsulting.scaichat.exeptions.NotFoundException;
import com.scaiconsulting.scaichat.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", exposedHeaders = "Authentication")
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService theUserService) {
        userService = theUserService;
    }

    @GetMapping("/test")
    public String confirmFunctionalityOfTheApp () {
        return "Get Request Received Every Thing is working Fine , time on server is : " + LocalDateTime.now() ;
    }

    @PostMapping("/sign-in")
    public ResponseEntity<User> signIn(@RequestBody Profile profile) {
        ResponseEntity<User> AuthenticatedProfile = userService.getProfile(profile.getEmail(), profile.getPassword());
        if (AuthenticatedProfile != null) {
            return AuthenticatedProfile;
        } else {
            throw new NotFoundException("bad_credentials");
        }
    }

    @PostMapping("/sign-up")
    public User signUp(@RequestBody Profile profile) {
        return userService.signUp(profile);
    }

    // Read
    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/users/{userId}")
    public User getUserById(@PathVariable int userId) {
        return userService.getUser(userId);
    }

    @GetMapping("/user")
    public User getAuthenticatedUser (@RequestHeader("Authentication") String token ) {
        return this.userService.getUser(new IdExtractor(token).getAuthenticatedUserId());
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
