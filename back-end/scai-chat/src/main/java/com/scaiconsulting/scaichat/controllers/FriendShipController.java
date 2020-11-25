package com.scaiconsulting.scaichat.controllers;

import com.scaiconsulting.scaichat.configurations.IdExtractor;
import com.scaiconsulting.scaichat.entities.FriendShip;
import com.scaiconsulting.scaichat.services.FriendShipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*",  exposedHeaders = "Authentication")
@RequestMapping("/api")
public class FriendShipController {

    private final FriendShipService friendShipService ;

    @Autowired
    public FriendShipController(FriendShipService friendShipService) {
        this.friendShipService = friendShipService;
    }

    @GetMapping("/friendships")
    public List<FriendShip> getFriendshipList( @RequestHeader("Authentication") String token){
        return friendShipService.getFriendShipList(new IdExtractor(token).getAuthenticatedUserId());

    }




}
