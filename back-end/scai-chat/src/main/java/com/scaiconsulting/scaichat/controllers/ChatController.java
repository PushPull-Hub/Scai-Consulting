package com.scaiconsulting.scaichat.controllers;

import com.scaiconsulting.scaichat.configurations.Chat;
import com.scaiconsulting.scaichat.configurations.MessageDTO;
import com.scaiconsulting.scaichat.entities.Conversation;
import com.scaiconsulting.scaichat.entities.Message;
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

    @PostMapping("/chats")
    public Conversation createConversation(@RequestHeader("Authentication") String token, @RequestBody int friendId) {
        return chatService.createConversation(token,friendId);
    }



    @PostMapping("/conversation")
    public Chat getConversationByUsersIds(@RequestHeader("Authentication") String token, @RequestBody int friendId) {
        if (this.chatService.getConversationByUsersIds(token, friendId) != null) {

            return this.chatService.getConversationByUsersIds(token, friendId);
        } else throw new NotFoundException("can't find user with id :" + friendId);
    }

    @GetMapping("/conversation/{id}")
    public Chat getConversationByItsId(@RequestHeader("Authentication") String token,@PathVariable int id) {
        if (this.chatService.getConversationByItsId(token,id) != null) {
            return this.chatService.getConversationByItsId(token,id);
        } else throw new NotFoundException("can't find conversation with id :" + id);
    }

    @GetMapping("/chats")
    public List<Conversation> getConversations(@RequestHeader("Authentication") String token) {
        return this.chatService.getConversations(token);
    }

    @PostMapping("/messages/message")
    public Message sendMessage(@RequestHeader("Authentication") String token, @RequestBody MessageDTO message) {
       return  this.chatService.sendMessage(token, message);
    }

    @PostMapping("/see-last-message")
    public Conversation setConversationLastMessageToSeen(@RequestHeader("Authentication") String token ,@RequestBody int conversationId){
        return this.chatService.setConversationLastMessageToSeen(conversationId);
    }



}
