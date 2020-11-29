package com.scaiconsulting.scaichat.controllers;

import com.scaiconsulting.scaichat.configurations.IdExtractor;
import com.scaiconsulting.scaichat.entities.FriendShip;
import com.scaiconsulting.scaichat.entities.User;
import com.scaiconsulting.scaichat.services.FriendShipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", exposedHeaders = "Authentication")
@RequestMapping("/api")
public class FriendShipController {

    private final FriendShipService friendShipService;

    @Autowired
    public FriendShipController(FriendShipService friendShipService) {
        this.friendShipService = friendShipService;
    }

    @GetMapping("/friendships")
    public List<FriendShip> getFriendshipList(@RequestHeader("Authentication") String token) {
        return friendShipService.getFriendShipList(new IdExtractor(token).getAuthenticatedUserId());

    }

    @GetMapping("/friendships/{friendShipId}")
    public FriendShip getFriendShipByItsId(@PathVariable int friendShipId) {
        return friendShipService.getFriendShipByItsId(friendShipId);
    }


    @PostMapping("/friendships/friend")
    public FriendShip getFriendShipByFriendId(@RequestBody int friendId) {
        return friendShipService.getFriendShipByFriendId(friendId);
    }

    @PostMapping("/friendships")
    public FriendShip addFriend(@RequestHeader("Authentication") String token, @RequestBody int friendId) {
        return this.friendShipService.createFriendShip(token, friendId);
    }

    @GetMapping("/friendships/suggestions")
    public List<User> getTenFriendsSuggestion(@RequestHeader("Authentication") String token) {
        return this.friendShipService.getTenFriendsSuggestion(token);
    }

}
