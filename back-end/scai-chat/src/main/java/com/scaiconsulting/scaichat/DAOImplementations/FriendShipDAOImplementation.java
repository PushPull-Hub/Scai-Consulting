package com.scaiconsulting.scaichat.DAOImplementations;

import com.scaiconsulting.scaichat.DAOs.FriendShipDAO;
import com.scaiconsulting.scaichat.entities.FriendShip;
import com.scaiconsulting.scaichat.entities.User;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.ArrayList;
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
        try {
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
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<FriendShip> getRelationShipShipList(int userId) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<FriendShip> theQuery = currentSession.createQuery("from FriendShip where firstUserId=:userId or secondUserId=:userId ", FriendShip.class);
        theQuery.setParameter("userId", userId);
        return theQuery.getResultList();
    }

    @Override
    public List<FriendShip> getFriendShipShipList(int userId) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<FriendShip> theQuery = currentSession.createQuery("from FriendShip where firstUserId=:userId or secondUserId=:userId and status=1", FriendShip.class);
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
        return currentSession.createQuery("delete from FriendShip where id=:id").setParameter("id", id).executeUpdate();

    }

    @Override
    public List<User> getTenFriendsSuggestions(int userId) {
        Session currentSession = entityManager.unwrap(Session.class);

        ArrayList<Integer> friendsIds = new ArrayList<>();
        try {
            List<FriendShip> userFriendShips = this.getRelationShipShipList(userId);
            if (userFriendShips.size() > 0) {
                for (FriendShip friendShip : userFriendShips) {
                    if (friendShip.getFirstUserId() == userId) {
                        friendsIds.add(friendShip.getSecondUserId());
                    } else {
                        friendsIds.add(friendShip.getFirstUserId());
                    }
                }
                try {
                    Query<User> theNotFriendQuery = currentSession.createQuery("from User u where u.id NOT IN (:friendsIds) and u.id !=:userId ", User.class);
                    theNotFriendQuery.setParameter("friendsIds", friendsIds);
                    theNotFriendQuery.setParameter("userId", userId);
                    theNotFriendQuery.setMaxResults(10);
                    return theNotFriendQuery.getResultList();
                } catch (Exception e) {
                    e.printStackTrace();
                    return null;
                }
            } else {
                Query<User> theQuery = currentSession.createQuery("from User u where u.id !=:userId", User.class);
                theQuery.setParameter("userId", userId);
                theQuery.setMaxResults(10);
                return theQuery.getResultList();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }


// Status Codes
//0	Pending
//1	Accepted
//2	Declined
//3	Blocked


}
