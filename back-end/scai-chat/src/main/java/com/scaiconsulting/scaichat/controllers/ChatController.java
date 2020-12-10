package com.scaiconsulting.scaichat.controllers;

import com.scaiconsulting.scaichat.entities.Conversation;
import com.scaiconsulting.scaichat.exeptions.NotFoundException;
import com.scaiconsulting.scaichat.services.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", exposedHeaders = "Authentication")
@RequestMapping("/api")
public class ChatController {

    private final ChatService chatService;

    @Autowired
    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping(name = "/conversation")
    public Conversation createConversation(@RequestHeader("Authentication") String token, @RequestBody int friendId) {
        return this.chatService.createConversation(token, friendId);
    }

    @GetMapping(name = "/conversation")
    public Conversation getConversation(@RequestHeader("Authentication") String token, @RequestBody int friendId) {
        return this.chatService.createConversation(token, friendId);
    }

    @GetMapping(name = "/conversations")
    public List<Conversation> getConversations(String token) {
        return this.chatService.getConversations(token);
    }

    @PutMapping(name = "/conversation")
    public Conversation updateConversation(@RequestHeader("Authentication") String token, @RequestBody Conversation conversation) {
        Conversation result = this.chatService.getConversation(conversation.getId());
        if (conversation.getId() > 0) {
            if (result != null) {
                return this.chatService.updateConversation(conversation);
            } else throw new NotFoundException("can't find conversation with id :" + conversation.getId());
        } else throw new NotFoundException("conversation needs to include an id");
    }


}
