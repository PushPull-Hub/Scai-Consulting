package com.scaiconsulting.scaichat.rest;


import com.scaiconsulting.scaichat.entities.Account;
import com.scaiconsulting.scaichat.entities.User;
import com.scaiconsulting.scaichat.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "http://localhost:8080")
@RequestMapping("/api")
public class UserRestController {

    private UserService userService;

    @Autowired
    public UserRestController(UserService theUserService) {
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

}
