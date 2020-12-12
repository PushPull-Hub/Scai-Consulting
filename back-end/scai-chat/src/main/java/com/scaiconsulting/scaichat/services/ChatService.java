package com.scaiconsulting.scaichat.services;

import com.scaiconsulting.scaichat.DTOs.Chat;
import com.scaiconsulting.scaichat.DTOs.MessageDTO;
import com.scaiconsulting.scaichat.entities.Conversation;
import com.scaiconsulting.scaichat.entities.Message;

import java.util.List;

public interface ChatService {

    List<Chat> getChats(String token ) ;

    Chat getChatByItsId(String token , int conversationId);

    List<Message> getMessagesByConversationId(int conversationId);

    Conversation createConversation(String token, int secondUserId);

    Chat getConversationByUsersIds(String token, int secondUserId);

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
