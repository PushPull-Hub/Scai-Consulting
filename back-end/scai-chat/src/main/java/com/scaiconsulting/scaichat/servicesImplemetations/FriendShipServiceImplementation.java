package com.scaiconsulting.scaichat.servicesImplemetations;


import com.scaiconsulting.scaichat.DAOs.FriendShipDAO;
import com.scaiconsulting.scaichat.entities.FriendShip;
import com.scaiconsulting.scaichat.services.FriendShipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FriendShipServiceImplementation  implements FriendShipService {

    private final FriendShipDAO friendShipDAO ;

    @Autowired
    public FriendShipServiceImplementation(FriendShipDAO friendShipDAO) {
        this.friendShipDAO = friendShipDAO;
    }

    @Override
    @Transactional
    public List<FriendShip> getFriendShipList(int userId) {
        return friendShipDAO.getFriendShipList(userId);
    }




}
