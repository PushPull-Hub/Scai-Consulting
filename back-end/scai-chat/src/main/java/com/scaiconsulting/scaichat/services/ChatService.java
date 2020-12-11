package com.scaiconsulting.scaichat.services;

import com.scaiconsulting.scaichat.configurations.Chat;
import com.scaiconsulting.scaichat.configurations.MessageDTO;
import com.scaiconsulting.scaichat.entities.Conversation;
import com.scaiconsulting.scaichat.entities.Message;

import java.util.List;

public interface ChatService {

    Conversation createConversation(String token, int secondUserId);

    Chat getConversationByUsersIds(String token, int secondUserId);

    Chat getConversationByItsId(String token , int conversationId);

    List<Conversation> getConversations(String token);

    Conversation updateConversation(Conversation conversation );

    int deleteConversation(int conversationId);

    Message getLastMessage(int conversationId);

    Message getMessage(int messageId);

    Message sendMessage(String token , MessageDTO message);

    Conversation setConversationLastMessageToSeen (int conversationId);

    Message updateMessage(Message message);

    int deleteMessage (int messageId);
}
