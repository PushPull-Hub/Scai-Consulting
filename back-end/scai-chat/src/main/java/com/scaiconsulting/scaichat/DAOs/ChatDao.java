package com.scaiconsulting.scaichat.DAOs;

import com.scaiconsulting.scaichat.entities.Conversation;
import com.scaiconsulting.scaichat.entities.Message;

import java.util.List;

public interface ChatDao {

    Conversation createConversation(Conversation conversation);

    Conversation getConversationByUsersIds(int firstUserId, int secondUserId);

    Conversation getConversationByItsId(int conversationId);

    List<Conversation> getConversations(int userId);

    Conversation updateConversation(Conversation conversation);

    int deleteConversation(int conversationId);

    Message createMessage(Message message);

    Message getMessage(int messageId);

    Message getLastMessage(int conversationId);

    List<Message> getMessagesByConversationId(int conversationId);

    Message updateMessage(Message message);

    int deleteMessage (int messageId);

}
