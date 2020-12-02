package com.scaiconsulting.scaichat.controllers;

import com.scaiconsulting.scaichat.entities.FriendShip;
import com.scaiconsulting.scaichat.exeptions.NotFoundException;
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

    @GetMapping("/friendship")
    public FriendShip getFriendShipBy(@RequestHeader("Authentication") String token, @RequestBody int friendId) {
        return friendShipService.getFriendShip(token, friendId);
    }


    @GetMapping("/friendships")
    public List<FriendShip> getFriendshipList(@RequestHeader("Authentication") String token) {
        return friendShipService.getFriendShipList(token);
    }


    @GetMapping("/requestFriendship")
    public FriendShip addFriend(@RequestHeader("Authentication") String token, @RequestBody int friendId) {
        FriendShip friendShip = friendShipService.sendFriendRequest(token, friendId);
        if (friendShip != null) {
            return friendShip;
        } else {
            throw new NotFoundException("problem detected");
        }
    }

}
