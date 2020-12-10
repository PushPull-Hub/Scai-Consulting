package com.scaiconsulting.scaichat.servicesImplemetations;

import com.scaiconsulting.scaichat.DAOs.ChatDao;
import com.scaiconsulting.scaichat.DAOs.UserDAO;
import com.scaiconsulting.scaichat.configurations.IdExtractor;
import com.scaiconsulting.scaichat.entities.Conversation;
import com.scaiconsulting.scaichat.exeptions.NotFoundException;
import com.scaiconsulting.scaichat.services.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ChatServiceImplementation implements ChatService {

    private final ChatDao chatDao;
    private final UserDAO userDAO;

    @Autowired
    public ChatServiceImplementation(ChatDao chatDao, UserDAO userDAO) {
        this.chatDao = chatDao;
        this.userDAO = userDAO;
    }

    @Override
    public Conversation createConversation(String token, int secondUserId) {
        if (userDAO.getUser(secondUserId) != null) {
            int userId = new IdExtractor(token).getAuthenticatedUserId();
            Conversation conversation = new Conversation();
            conversation.setFirstUserId(userId);
            conversation.setSecondUserId(userId);
            return this.chatDao.createConversation(conversation);
        } else throw new NotFoundException("can't find user with id :" + secondUserId);
    }

    @Override
    public Conversation getConversation(String token, int secondUserId) {
        int userId = new IdExtractor(token).getAuthenticatedUserId();
        if (userDAO.getUser(secondUserId) != null) {
            return this.chatDao.getConversation(userId, secondUserId);
        } else throw new NotFoundException("can't find user with id :" + secondUserId);
    }

    @Override
    public Conversation getConversation(int conversationId) {
        return this.chatDao.getConversation(conversationId);
    }

    @Override
    public List<Conversation> getConversations(String token) {
        int userId = new IdExtractor(token).getAuthenticatedUserId();
        return this.chatDao.getConversations(userId);
    }

    @Override
    public Conversation updateConversation(Conversation conversation) {
        return this.chatDao.updateConversation(conversation);
    }

    @Override
    public int deleteConversation(int conversationId) {
        return this.chatDao.deleteConversation(conversationId);
    }
}
