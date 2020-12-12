package com.scaiconsulting.scaichat.DAOImplementations;

import com.scaiconsulting.scaichat.DAOs.ChatDao;
import com.scaiconsulting.scaichat.entities.Conversation;
import com.scaiconsulting.scaichat.entities.Message;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
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
    public Conversation getConversationByUsersIds(int firstUserId, int secondUserId) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<Conversation> theQuery = currentSession.createQuery("from Conversation where firstUserId=:firstUserId and secondUserId=:secondUserId "
                        + " or firstUserId=:secondUserId and secondUserId=:firstUserId",
                Conversation.class);
        theQuery.setParameter("firstUserId", firstUserId);
        theQuery.setParameter("secondUserId", secondUserId);
        return theQuery.getSingleResult();
    }

    @Override
    public Conversation getConversationByItsId(int conversationId) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<Conversation> theQuery = currentSession.createQuery("from Conversation where id=:conversationId",
                Conversation.class);
        theQuery.setParameter("conversationId", conversationId);
        return theQuery.getSingleResult();
    }

    @Override
    public List<Conversation> getConversations(int userId) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<Conversation> theQuery = currentSession.createQuery("from Conversation where firstUserId=:userId or secondUserId=:userId",
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

    @Override
    public Message createMessage(Message message) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.saveOrUpdate(message);
        return message;
    }

    @Override
    public Message getMessage(int messageId) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<Message> theQuery = currentSession.createQuery("from Message where id=:messageId", Message.class);
        theQuery.setParameter("messageId", messageId);
        return theQuery.getSingleResult();
    }

    @Override
    public Message getLastMessage(int conversation_id) {
        Message lastMessage = null;
        Session currentSession = entityManager.unwrap(Session.class);
        Query<Message> theQuery = currentSession.createQuery("from Message where conversation_id=:conversation_id order by createdTime DESC", Message.class);
        theQuery.setParameter("conversation_id", conversation_id);
        theQuery.setMaxResults(1);

        try {
            lastMessage = theQuery.getSingleResult();
        } catch (NoResultException nre) {
            return null;
        }
        return lastMessage;

    }


    @Override
    public List<Message> getMessagesByConversationId(int conversationId) {
        List<Message> myMessages = null;
        Session currentSession = entityManager.unwrap(Session.class);
        Query<Message> theQuery = currentSession.createQuery("from Message where conversation_id=:conversationId", Message.class);
        theQuery.setParameter("conversationId", conversationId);
        try {
            myMessages = theQuery.getResultList();
        } catch (NoResultException nre) {
            return null;
        }
        return myMessages;
    }

    @Override
    public Message updateMessage(Message message) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.saveOrUpdate(message);
        return message;
    }

    @Override
    public int deleteMessage(int messageId) {
        Session currentSession = entityManager.unwrap(Session.class);
        return currentSession.createQuery("delete from Message where id=:messageId").setParameter("messageId", messageId).executeUpdate();
    }
}
