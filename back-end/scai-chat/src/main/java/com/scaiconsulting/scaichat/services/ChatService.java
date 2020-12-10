package com.scaiconsulting.scaichat.services;

import com.scaiconsulting.scaichat.entities.Conversation;

import java.util.List;

public interface ChatService {

    Conversation createConversation(String token, int secondUserId);

    Conversation getConversation(String token, int secondUserId);

    Conversation getConversation(int conversationId);

    List<Conversation> getConversations(String token);

    Conversation updateConversation(Conversation conversation );

    int deleteConversation(int conversationId);
}
