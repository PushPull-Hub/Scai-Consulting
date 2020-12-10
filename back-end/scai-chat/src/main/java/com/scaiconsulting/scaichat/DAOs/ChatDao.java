package com.scaiconsulting.scaichat.DAOs;

import com.scaiconsulting.scaichat.entities.Conversation;

import java.util.List;

public interface ChatDao {

    Conversation createConversation(Conversation conversation);

    Conversation getConversation(int firstUserId, int secondUserId);

    Conversation getConversation(int conversationId);

    List<Conversation> getConversations(int userId);

    Conversation updateConversation(Conversation conversation);

    int deleteConversation(int conversationId);

}
