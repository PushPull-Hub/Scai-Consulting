package com.scaiconsulting.scaichat.controllers;


import com.scaiconsulting.scaichat.DTO.Account;
import com.scaiconsulting.scaichat.entities.Profile;
import com.scaiconsulting.scaichat.entities.User;
import com.scaiconsulting.scaichat.error_handlers.NotFoundException;
import com.scaiconsulting.scaichat.repos.ProfileRepository;
import com.scaiconsulting.scaichat.services.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
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

    @Autowired
    ProfileRepository profileRepository;

    @PostMapping("/sign-in")
    public ResponseEntity<Profile> getProfile(@RequestBody Profile profile) {
        // Profile theProfile = userService.getProfile(profile.getEmail(), profile.getPassword());
        Profile AuthenticatedProfile = profileRepository.getAuthenticatedProfile(profile.getEmail(),profile.getPassword());
        if (AuthenticatedProfile != null) {
            HttpHeaders headers = new HttpHeaders();
            HashMap<String, Object> addedValues = new HashMap<String, Object>();
            addedValues.put("id",AuthenticatedProfile.getId());
            String token = Jwts.builder()
                    .addClaims(addedValues)
                    .setIssuedAt(new Date(System.currentTimeMillis()))
                    .setExpiration(new Date(System.currentTimeMillis() + 60 * 60 * 1000))
                    .signWith(SignatureAlgorithm.HS512, "ciao").compact();
            headers.add("Authentication","Bearer"+token);
            return ResponseEntity.ok().headers(headers).build();
        }else {
            // throw new NotFoundException("bad_credentials");
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }


    // Create

    @PostMapping("/profiles")
    public Account createAccount(@RequestBody Account account) {
        userService.createAccount(account);
        return account;
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
