package com.scaiconsulting.scaichat.servicesImplemetations;

import com.scaiconsulting.scaichat.DAOs.ChatDao;
import com.scaiconsulting.scaichat.DAOs.UserDAO;
import com.scaiconsulting.scaichat.configurations.Chat;
import com.scaiconsulting.scaichat.configurations.IdExtractor;
import com.scaiconsulting.scaichat.configurations.MessageDTO;
import com.scaiconsulting.scaichat.configurations.MiniUserProfile;
import com.scaiconsulting.scaichat.entities.Conversation;
import com.scaiconsulting.scaichat.entities.Message;
import com.scaiconsulting.scaichat.services.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;

@Service
public class ChatServiceImplementation implements ChatService {

    private final ChatDao chatDao;
    private final UserDAO userDAO;

    @Autowired
    public ChatServiceImplementation(ChatDao chatDao, UserDAO userDAO) {
        this.chatDao = chatDao;
        this.userDAO = userDAO;
    }

    @Override
    @Transactional
    public Conversation createConversation(String token, int secondUserId) {
        if (userDAO.getUser(secondUserId) != null) {
            int userId = new IdExtractor(token).getAuthenticatedUserId();
            Conversation conversation = new Conversation();
            conversation.setFirstUserId(userId);
            conversation.setSecondUserId(secondUserId);
            return this.chatDao.createConversation(conversation);
        } else return null;
    }

    @Override
    @Transactional
    public Chat getConversationByUsersIds(String token, int secondUserId) {
        int userId = new IdExtractor(token).getAuthenticatedUserId();
        if (userDAO.getUser(secondUserId) != null) {
            Chat chat = new Chat();
            Conversation conversation = this.chatDao.getConversationByUsersIds(userId, secondUserId);
            MiniUserProfile myFriendProfile;

            Message lastMessage = this.getLastMessage(conversation.getId());
            myFriendProfile = this.userDAO.getMiniUserProfile(secondUserId);
            if (conversation.getFirstUserId() == userId) {
                chat.setId(conversation.getId());
                chat.setMyId(conversation.getFirstUserId());
                chat.setSecondUser(myFriendProfile);
                chat.setIsLastMessageSeen(conversation.getIsLastMessageSeen());
                if (this.getLastMessage(conversation.getId()) != null) {
                    chat.setLastMessage(lastMessage);
                } else {
                    chat.setLastMessage(null);
                }

            } else if (conversation.getFirstUserId() != userId) {
                myFriendProfile = this.userDAO.getMiniUserProfile(userId);
                chat.setId(conversation.getId());
                chat.setMyId(conversation.getSecondUserId());
                chat.setSecondUser(myFriendProfile);
                chat.setIsLastMessageSeen(conversation.getIsLastMessageSeen());
                if (this.getLastMessage(conversation.getId()) != null) {
                    chat.setLastMessage(lastMessage);
                } else {
                    chat.setLastMessage(null);
                }
            }
            return chat;
        } else return null;
    }

    @Override
    @Transactional
    public Chat getConversationByItsId(String token, int conversationId) {
        int userId = new IdExtractor(token).getAuthenticatedUserId();
        Chat chat = new Chat();
        if (this.chatDao.getConversationByItsId(conversationId) != null) {
            Conversation conversation = this.chatDao.getConversationByItsId(conversationId);
            MiniUserProfile myFriendProfile;

            Message lastMessage = this.getLastMessage(conversation.getId());

            if (conversation.getFirstUserId() == userId) {
                chat.setId(conversation.getId());
                chat.setMyId(conversation.getFirstUserId());
                chat.setSecondUser(this.userDAO.getMiniUserProfile(conversation.getSecondUserId()));
                chat.setIsLastMessageSeen(conversation.getIsLastMessageSeen());
                if (this.getLastMessage(conversation.getId()) != null) {
                    chat.setLastMessage(lastMessage);
                } else {
                    chat.setLastMessage(null);
                }

            } else if (conversation.getFirstUserId() != userId) {
                myFriendProfile = this.userDAO.getMiniUserProfile(conversation.getFirstUserId());
                chat.setId(conversation.getId());
                chat.setMyId(conversation.getSecondUserId());
                chat.setSecondUser(myFriendProfile);
                chat.setIsLastMessageSeen(conversation.getIsLastMessageSeen());
                if (this.getLastMessage(conversation.getId()) != null) {
                    chat.setLastMessage(lastMessage);
                } else {
                    chat.setLastMessage(null);
                }
            }
            return chat;

        } else return null;
    }

    @Override
    @Transactional
    public List<Conversation> getConversations(String token) {
        int userId = new IdExtractor(token).getAuthenticatedUserId();
        return this.chatDao.getConversations(userId);
    }

    @Override
    @Transactional
    public Conversation updateConversation(Conversation conversation) {
        return this.chatDao.updateConversation(conversation);
    }

    @Override
    @Transactional
    public int deleteConversation(int conversationId) {
        return this.chatDao.deleteConversation(conversationId);
    }

    @Override
    @Transactional
    public Message getLastMessage(int conversationId) {
        return this.chatDao.getLastMessage(conversationId);
    }

    @Override
    @Transactional
    public Message sendMessage(String token, MessageDTO message) {
        Conversation conversation = this.chatDao.getConversationByItsId(message.getConversionId());
        Message theMessage = new Message();
        Timestamp now = new Timestamp(System.currentTimeMillis());
        int userId = new IdExtractor(token).getAuthenticatedUserId();
        theMessage.setId(0);
        theMessage.setSenderId(userId);
        theMessage.setCreatedTime(now);
        theMessage.setConversation(conversation);
        theMessage.setReceiverId(message.getReceiverId());
        theMessage.setText(message.getText());
        return this.chatDao.createMessage(theMessage);
    }

    @Override
    @Transactional
    public Conversation setConversationLastMessageToSeen(int conversationId) {
        Conversation theConversation = this.chatDao.getConversationByItsId(conversationId);
        theConversation.setIsLastMessageSeen(1);
        return this.chatDao.updateConversation(theConversation);
    }

    @Override
    @Transactional
    public Message getMessage(int messageId) {
        return null;
    }

    @Override
    @Transactional
    public Message updateMessage(Message message) {
        return null;
    }

    @Override
    @Transactional
    public int deleteMessage(int messageId) {
        return 0;
    }
}
