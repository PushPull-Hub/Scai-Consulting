package com.scaiconsulting.scaichat.servicesImplemetations;


import com.scaiconsulting.scaichat.DAOs.FriendShipDAO;
import com.scaiconsulting.scaichat.configurations.IdExtractor;
import com.scaiconsulting.scaichat.entities.FriendShip;
import com.scaiconsulting.scaichat.services.FriendShipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FriendShipServiceImplementation implements FriendShipService {

    private final FriendShipDAO friendShipDAO;

    @Autowired
    public FriendShipServiceImplementation(FriendShipDAO friendShipDAO) {
        this.friendShipDAO = friendShipDAO;
    }

    @Override
    @Transactional
    public List<FriendShip> getFriendShipList(int userId) {
        return friendShipDAO.getFriendShipList(userId);
    }

    @Override
    @Transactional
    public FriendShip getFriendShipByItsId(int id) {
        return friendShipDAO.getFriendShipByItsId(id);
    }

    @Override
    @Transactional
    public FriendShip getFriendShipByFriendId(int friendId) {
        return friendShipDAO.getFriendShipByFriendId(friendId);
    }

    @Override
    @Transactional
    public FriendShip createFriendShip(String token, int userId2) {
        FriendShip friendShip = new FriendShip();
        friendShip.setId(0);
        friendShip.setFirstUserId(new IdExtractor(token).getAuthenticatedUserId());
        friendShip.setSecondUserId(userId2);
        friendShip.setType("friends");
        return friendShipDAO.createFriendShip(friendShip);
    }

    @Override
    @Transactional
    public List<FriendShip> getTenFriendsSuggestion(String token) {
        return friendShipDAO.getTenFriendsSuggestion(new IdExtractor(token).getAuthenticatedUserId());
    }


}
