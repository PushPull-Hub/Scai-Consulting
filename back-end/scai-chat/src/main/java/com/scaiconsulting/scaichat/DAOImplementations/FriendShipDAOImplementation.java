package com.scaiconsulting.scaichat.DAOImplementations;

import com.scaiconsulting.scaichat.DAOs.FriendShipDAO;
import com.scaiconsulting.scaichat.entities.FriendShip;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
public class FriendShipDAOImplementation implements FriendShipDAO {

    private final EntityManager entityManager;

    @Autowired
    public FriendShipDAOImplementation(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public FriendShip getFriendShip(int user_id_one, int user_id_two) {
        Session currentSession = entityManager.unwrap(Session.class);
        FriendShip friendShipResult = null;

        if (user_id_one < user_id_two) {
            Query<FriendShip> theQuery = currentSession.createQuery("from FriendShip where firstUserId=:user_id_one and secondUserId=:user_id_two ", FriendShip.class);
            theQuery.setParameter("user_id_one", user_id_one);
            theQuery.setParameter("user_id_two", user_id_two);
            friendShipResult = theQuery.uniqueResult();
        } else if (user_id_one > user_id_two) {
            Query<FriendShip> theQuery = currentSession.createQuery("from FriendShip where firstUserId=:user_id_two and secondUserId=:user_id_one", FriendShip.class);
            theQuery.setParameter("user_id_one", user_id_one);
            theQuery.setParameter("user_id_two", user_id_two);
            friendShipResult = theQuery.uniqueResult();
        }
        return friendShipResult;
    }

    @Override
    public List<FriendShip> getFriendShipList(int userId) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<FriendShip> theQuery = currentSession.createQuery("from FriendShip where firstUserId=:userId or secondUserId=:userId ", FriendShip.class);
        theQuery.setParameter("userId", userId);
        return theQuery.getResultList();
    }

    @Override
    public FriendShip sendFriendRequest(FriendShip friendShip) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.saveOrUpdate(friendShip);
        return friendShip;
    }

    @Override
    public FriendShip acceptFriendRequest(FriendShip friendShip) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.saveOrUpdate(friendShip);
        return friendShip;
    }

    @Override
    public List<FriendShip> getPendingFriendRequests(int userId) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<FriendShip> theQuery = currentSession.createQuery("from FriendShip where firstUserId=:userId and status =:Pending  and actionUserId !=:userId" +
                " or secondUserId=:userId and status =:Pending  and actionUserId!=:userId ", FriendShip.class);
        theQuery.setParameter("userId", userId);
        theQuery.setParameter("Pending", 0);
        return theQuery.getResultList();
    }

    @Override
    public List<FriendShip> getFriendRequests(int userId) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<FriendShip> theQuery = currentSession.createQuery("from FriendShip where firstUserId=:userId and status=:Pending and actionUserId =:userId" +
                " or secondUserId=:userId and status =:Pending  and actionUserId=:userId ", FriendShip.class);
        theQuery.setParameter("userId", userId);
        theQuery.setParameter("Pending", 0);
        return theQuery.getResultList();
    }


    @Override
    public FriendShip updateFriendShip(FriendShip friendShip) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.saveOrUpdate(friendShip);
        return friendShip;
    }

    @Override
    public int deleteFriendShip(int id) {
        Session currentSession = entityManager.unwrap(Session.class);
        return  currentSession.createQuery("delete from FriendShip where id=:id").setParameter("id",id).executeUpdate() ;

    }


// Status Codes
//0	Pending
//1	Accepted
//2	Declined
//3	Blocked


}
