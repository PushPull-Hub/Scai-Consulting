package com.scaiconsulting.scaichat.controllers;

import com.scaiconsulting.scaichat.DTOs.Chat;
import com.scaiconsulting.scaichat.DTOs.MessageDTO;
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

    @GetMapping("/my-chats")
    public List<Chat> getMyChats(@RequestHeader("Authentication") String token) {
        return this.chatService.getChats(token);
    }

    @PostMapping("/conversation/messages")
    List<Message> getMessagesByConversationId(@RequestHeader("Authentication") String token, @RequestBody int conversationId) {
        return this.chatService.getMessagesByConversationId(conversationId);
    }

//    @GetMapping("/conversations")
//    public List<Conversation> getConversations(@RequestHeader("Authentication") String token) {
//        return this.chatService.getConversations(token);
//    }

    @GetMapping("/chat/{id}")
    public Chat getChatByItsId(@RequestHeader("Authentication") String token, @PathVariable int id) {
        if (this.chatService.getChatByItsId(token, id) != null) {
            return this.chatService.getChatByItsId(token, id);
        } else throw new NotFoundException("can't find conversation with id :" + id);
    }

    @PostMapping("/chats")
    public Conversation createConversation(@RequestHeader("Authentication") String token, @RequestBody int friendId) {
        return chatService.createConversation(token, friendId);
    }


    @PostMapping("/conversation")
    public Chat getChatByUsersIds(@RequestHeader("Authentication") String token, @RequestBody int friendId) {
        if (this.chatService.getConversationByUsersIds(token, friendId) != null) {
            return this.chatService.getConversationByUsersIds(token, friendId);
        } else throw new NotFoundException("can't find user with id :" + friendId);
    }


    @PostMapping("/messages/message")
    public Message sendMessage(@RequestHeader("Authentication") String token, @RequestBody MessageDTO message) {
        return this.chatService.sendMessage(token, message);
    }

    @PostMapping("/see-last-message")
    public Conversation setConversationLastMessageToSeen(@RequestHeader("Authentication") String token, @RequestBody int conversationId) {
        return this.chatService.setConversationLastMessageToSeen(conversationId);
    }




}
