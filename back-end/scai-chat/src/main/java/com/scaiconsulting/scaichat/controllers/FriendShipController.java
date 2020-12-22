package com.scaiconsulting.scaichat.controllers;

import com.scaiconsulting.scaichat.DTOs.Chat;
import com.scaiconsulting.scaichat.DTOs.MiniUserProfile;
import com.scaiconsulting.scaichat.DTOs.RelationShips;
import com.scaiconsulting.scaichat.entities.FriendShip;
import com.scaiconsulting.scaichat.exeptions.NotFoundException;
import com.scaiconsulting.scaichat.services.ChatService;
import com.scaiconsulting.scaichat.services.FriendShipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", exposedHeaders = "Authentication")
@RequestMapping("/api")
public class FriendShipController {

    private final FriendShipService friendShipService;
    private final ChatService chatService;

    @Autowired
    public FriendShipController(FriendShipService friendShipService, ChatService chatService) {
        this.friendShipService = friendShipService;
        this.chatService = chatService;
    }

    @PostMapping("/friendship")
    public FriendShip getFriendShip(@RequestHeader("Authentication") String token, @RequestBody int friendId) {
        return friendShipService.getFriendShip(token, friendId);
    }

    @GetMapping("/friendships")
    public List<FriendShip> getFriendshipList(@RequestHeader("Authentication") String token) {
        return friendShipService.getFriendShipList(token);
    }

    @PostMapping("/friend-request")
    public FriendShip sendFriendRequest(@RequestHeader("Authentication") String token, @RequestBody int friendId) {
        FriendShip friendShip = friendShipService.sendFriendRequest(token, friendId);
        if (friendShip != null) {
            return friendShip;
        } else {
            throw new NotFoundException("problem detected");
        }
    }

    @PutMapping("/friend-request")
    public FriendShip acceptFriendRequest(@RequestHeader("Authentication") String token, @RequestBody int requester) {
        FriendShip result = friendShipService.acceptFriendRequest(token, requester);
        if (result != null) {
            this.chatService.createConversation(token, requester);
        }
        return result;
    }

    @GetMapping("/friend-request/pending")
    public List<FriendShip> getPendingFriendRequests(@RequestHeader("Authentication") String token) {
        return friendShipService.getPendingFriendRequests(token);
    }

    @PutMapping("/friendship")
    public boolean blockFriend(@RequestHeader("Authentication") String token, @RequestBody int friendId) {
        boolean result = friendShipService.blockFriend(token, friendId);
        if (result) {
            Chat usersChat = this.chatService.getConversationByUsersIds(token, friendId);
            this.chatService.deleteConversation(usersChat.getId());
        }
        return result;
    }

    @PutMapping("/friendship/friend")
    public boolean unblockFriend(@RequestHeader("Authentication") String token, @RequestBody int friendId) {
        return friendShipService.unblockFriend(token, friendId);
    }

    @GetMapping("/relationships")
    public RelationShips getUserRelationShips(@RequestHeader("Authentication") String token) {
        return friendShipService.getRelationShips(token);
    }

    @PostMapping("/cancel-request")
    public boolean cancelFriendRequest(@RequestHeader("Authentication") String token, @RequestBody int friendId) {
        return friendShipService.cancelFriendRequest(token, friendId);
    }

    @PostMapping("/relationships/decline")
    public boolean declineFriendRequest(@RequestHeader("Authentication") String token, @RequestBody int friendId) {
        return this.friendShipService.DeclineFriendRequest(token, friendId);
    }

    @GetMapping("/suggestions")
    public List<MiniUserProfile> getTenFriendsSuggestions(@RequestHeader("Authentication") String token) {
        return this.friendShipService.getTenSuggestions(token);
    }

    @PostMapping("/friendship/unfriend")
    public boolean deleteFriendship(@RequestHeader("Authentication") String token, @RequestBody int friendId) {
        return this.friendShipService.cancelFriendRequest(token, friendId);
    }

}
