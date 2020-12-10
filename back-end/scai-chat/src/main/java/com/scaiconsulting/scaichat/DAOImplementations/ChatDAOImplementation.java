package com.scaiconsulting.scaichat.DAOImplementations;

import com.scaiconsulting.scaichat.DAOs.ChatDao;
import com.scaiconsulting.scaichat.entities.Conversation;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
public class ChatDAOImplementation implements ChatDao {

    private final EntityManager entityManager;

    @Autowired
    public ChatDAOImplementation(EntityManager entityManager) {
        this.entityManager = entityManager;
    }


    @Override
    public Conversation createConversation(Conversation conversation) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.saveOrUpdate(conversation);
        return conversation;
    }

    @Override
    public Conversation getConversation(int firstUserId, int secondUserId) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<Conversation> theQuery = currentSession.createQuery("from Conversation where firstUserId=:firstUserId and secondUserId=:secondUserId "
                        + " or firstUserId=:secondUserId and secondUserId=:firstUserId",
                Conversation.class);
        theQuery.setParameter("firstUserId", firstUserId);
        theQuery.setParameter("secondUserId", secondUserId);
        return theQuery.getSingleResult();
    }

    @Override
    public Conversation getConversation(int conversationId) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<Conversation> theQuery = currentSession.createQuery("from Conversation where id=:conversationId",
                Conversation.class);
        theQuery.setParameter("conversationId", conversationId);
        return theQuery.getSingleResult();
    }

    @Override
    public List<Conversation> getConversations(int userId) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<Conversation> theQuery = currentSession.createQuery("from Conversation where firstUserId=:userId or secondUserId=:userId ",
                Conversation.class);
        theQuery.setParameter("userId", userId);
        return theQuery.getResultList();
    }

    @Override
    public Conversation updateConversation(Conversation conversation) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.saveOrUpdate(conversation);
        return conversation;
    }

    @Override
    public int deleteConversation(int conversationId) {
        Session currentSession = entityManager.unwrap(Session.class);
        return currentSession.createQuery("delete from Conversation where id=:conversationId").setParameter("conversationId", conversationId).executeUpdate();
    }
}
