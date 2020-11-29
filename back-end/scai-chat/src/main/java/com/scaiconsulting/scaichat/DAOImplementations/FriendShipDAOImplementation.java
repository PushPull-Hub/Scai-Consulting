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
    public List<FriendShip> getFriendShipList(int userId) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<FriendShip> theQuery = currentSession.createQuery("from FriendShip f where f.firstUserId =:userId or secondUserId =:userId", FriendShip.class)
                .setParameter("userId", userId);
        return theQuery.getResultList();
    }

    @Override
    public FriendShip getFriendShipByItsId(int id) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<FriendShip> theQuery = currentSession.createQuery("from FriendShip f where f.id =:id", FriendShip.class)
                .setParameter("id", id);
        return theQuery.getSingleResult();
    }

    @Override
    public FriendShip getFriendShipByFriendId(int friendId) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<FriendShip> theQuery = currentSession.createQuery("from FriendShip f where f.firstUserId =:friendId or secondUserId =:friendId", FriendShip.class)
                .setParameter("friendId", friendId);
        return theQuery.getSingleResult();

    }

    @Override
    public FriendShip createFriendShip(FriendShip friendShip) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.saveOrUpdate(friendShip);
        return friendShip;
    }

    @Override
    public List<User> getTenFriendsSuggestion(int userId) {
        Session currentSession = entityManager.unwrap(Session.class);
        List<FriendShip> userFriendShips = this.getFriendShipList(userId);
        ArrayList<Integer> friendsId = new ArrayList<>();
        for (FriendShip friendShip : userFriendShips) {
            if (friendShip.getFirstUserId() == userId) {
                friendsId.add(friendShip.getSecondUserId());
            } else {
                friendsId.add(friendShip.getFirstUserId());
            }
        }
        Query<User> theNotFriendsQuery = currentSession.createQuery("select  from User u where u.id NOT IN (:friendsId) ", User.class);
        theNotFriendsQuery.setParameter("friendsId", friendsId).setMaxResults(10);
        return theNotFriendsQuery.getResultList();
    }

}
