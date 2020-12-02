package com.scaiconsulting.scaichat.DAOImplementations;

import com.scaiconsulting.scaichat.DAOs.FriendShipDAO;
import com.scaiconsulting.scaichat.entities.FriendShip;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

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
    public FriendShip sendFriendRequest(FriendShip friendShip) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.saveOrUpdate(friendShip);
        return friendShip;
    }


//    @Override
//    public List<FriendShip> getFriendShipList(int userId) {
//        Session currentSession = entityManager.unwrap(Session.class);
//        Query<FriendShip> theQuery = currentSession.createQuery("from FriendShip f where f.firstUserId =:userId or secondUserId =:userId", FriendShip.class)
//                .setParameter("userId", userId);
//        return theQuery.getResultList();
//    }
//
//  /*  @Override
//    public FriendShip getFriendShipByItsId(int id) {
//        Session currentSession = entityManager.unwrap(Session.class);
//        Query<FriendShip> theQuery = currentSession.createQuery("from FriendShip f where f.id =:id", FriendShip.class)
//                .setParameter("id", id);
//        return theQuery.getSingleResult();
//    }
//
//    @Override
//    public FriendShip getFriendShipByFriendId(int friendId) {
//        Session currentSession = entityManager.unwrap(Session.class);
//        Query<FriendShip> theQuery = currentSession.createQuery("from FriendShip f where f.firstUserId =:friendId or secondUserId =:friendId", FriendShip.class)
//                .setParameter("friendId", friendId);
//        return theQuery.getSingleResult();
//
//    }
//
//    @Override
//    public FriendShip createFriendShip(FriendShip friendShip) {
//        Session currentSession = entityManager.unwrap(Session.class);
//        currentSession.saveOrUpdate(friendShip);
//        return friendShip;
//    }*/
//
//    @Override
//    public List<User> getTenFriendsSuggestion(int userId) {
//        Session currentSession = entityManager.unwrap(Session.class);
//        List<FriendShip> userFriendShips = this.getFriendShipList(userId);
//        ArrayList<Integer> friendsId = new ArrayList<>();
//        for (FriendShip friendShip : userFriendShips) {
//            if (friendShip.getFirstUserId() == userId) {
//                friendsId.add(friendShip.getSecondUserId());
//            } else {
//                friendsId.add(friendShip.getFirstUserId());
//            }
//        }
//        Query<User> theNotFriendsQuery = currentSession.createQuery("select  from User u where u.id NOT IN (:friendsId) ", User.class);
//        theNotFriendsQuery.setParameter("friendsId", friendsId).setMaxResults(10);
//        return theNotFriendsQuery.getResultList();
//    }
//
//    @Override
//    public FriendShip sendFriendRequest(FriendShip friendShip) {
//        Session currentSession = entityManager.unwrap(Session.class);
//        currentSession.saveOrUpdate(friendShip);
//        return friendShip;
//    }
//
//    @Override
//    public int acceptFriendRequest(int acceptorId, int senderId) {
//        int updateResult = 0;
//        Session currentSession = entityManager.unwrap(Session.class);
//
//        if (acceptorId < senderId) {
//            Query tehQuery = currentSession.createQuery("update FriendShip f set f.status=:Accepted , f.actionUserId =:acceptorId where f.firstUserId =:acceptorId and f.secondUserId=:senderId ");
//            tehQuery.setParameter("Accepted", 1);
//            tehQuery.setParameter("acceptorId", acceptorId);
//            tehQuery.setParameter("senderId", senderId);
//            updateResult = tehQuery.executeUpdate();
//        } else if (acceptorId > senderId) {
//            Query tehQuery = currentSession.createQuery("update FriendShip f set f.status=:Accepted , f.actionUserId =:acceptorId where f.firstUserId =:senderId and f.secondUserId=:acceptorId");
//            tehQuery.setParameter("Accepted", 1);
//            tehQuery.setParameter("acceptorId", acceptorId);
//            tehQuery.setParameter("senderId", senderId);
//            updateResult = tehQuery.executeUpdate();
//        }
//
//        return updateResult;
//    }
//
//    @Override
//    public FriendShip checkFriendShip(int user_id_one, int user_id_two) {
//        Session currentSession = entityManager.unwrap(Session.class);
//        Query<FriendShip> theQuery = currentSession.createQuery("from FriendShip f where f.firstUserId =:user_id_one and  f.secondUserId=:user_id_two ",FriendShip.class);
//        theQuery.setParameter("user_id_one",user_id_one);
//        theQuery.setParameter("user_id_two",user_id_two);
//        return theQuery.getSingleResult();
//    }
//
//
//    @Override
//    public List<FriendShip> getPendingFriendRequests(int userId) {
//        Session currentSession = entityManager.unwrap(Session.class);
//        Query<FriendShip> theQuery = currentSession.createQuery("from FriendShip f where f.actionUserId=:userId and f.status=:Pending " , FriendShip.class);
//        theQuery.setParameter("userId",userId);
//        theQuery.setParameter("Pending",0);
//        return theQuery.getResultList() ;
//    }
//
//    @Override
//    public int blockFriend(int userId, int friendId) {
//        Session currentSession = entityManager.unwrap(Session.class);
//
//        if (userId < friendId){
//            Query<FriendShip> theQuery = currentSession.createQuery("update FriendShip f set f.status=:Blocked, f.actionUserId=:userId where  f.firstUserId =:userId and f.secondUserId=:friendId ",FriendShip.class);
//            theQuery.setParameter("Blocked",3);
//            theQuery.setParameter("userId",userId);
//            theQuery.setParameter("friendId",friendId);
//        }else if (userId > friendId){
//
//        }
//
//
//        return 0;
//    }


// Status Codes
//0	Pending
//1	Accepted
//2	Declined
//3	Blocked


}
