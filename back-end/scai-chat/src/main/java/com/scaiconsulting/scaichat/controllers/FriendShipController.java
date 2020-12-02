package com.scaiconsulting.scaichat.controllers;

import com.scaiconsulting.scaichat.configurations.RelationShips;
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

    @GetMapping("/friend-request")
    public FriendShip sendFriendRequest(@RequestHeader("Authentication") String token, @RequestBody int friendId) {
        FriendShip friendShip = friendShipService.sendFriendRequest(token, friendId);
        if (friendShip != null) {
            return friendShip;
        } else {
            throw new NotFoundException("problem detected");
        }
    }

    @PostMapping("/friend-request")
    public FriendShip acceptFriendRequest(@RequestHeader("Authentication") String token, @RequestBody int requester) {
        return friendShipService.acceptFriendRequest(token, requester);
    }


    @GetMapping("/friend-request/pending")
    public List<FriendShip> getPendingFriendRequests(@RequestHeader("Authentication") String token) {
        return friendShipService.getPendingFriendRequests(token);
    }

    @PutMapping("/friendship/block")
    public boolean blockFriend(@RequestHeader("Authentication") String token, @RequestBody int friendId) {
        return friendShipService.blockFriend(token, friendId);
    }

    @GetMapping("/relationships")
    public RelationShips getUserRelationShips(@RequestHeader("Authentication") String token) {
        return friendShipService.getRelationShips(token);
    }
}
