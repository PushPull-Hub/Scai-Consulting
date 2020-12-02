package com.scaiconsulting.scaichat.servicesImplemetations;

import com.scaiconsulting.scaichat.DAOs.FriendShipDAO;
import com.scaiconsulting.scaichat.DAOs.UserDAO;
import com.scaiconsulting.scaichat.configurations.IdExtractor;
import com.scaiconsulting.scaichat.entities.FriendShip;
import com.scaiconsulting.scaichat.exeptions.NotFoundException;
import com.scaiconsulting.scaichat.services.FriendShipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FriendShipServiceImplementation implements FriendShipService {

    private final FriendShipDAO friendShipDAO;
    private final UserDAO userDAO;

    @Autowired
    public FriendShipServiceImplementation(FriendShipDAO friendShipDAO, UserDAO userDAO) {
        this.friendShipDAO = friendShipDAO;
        this.userDAO = userDAO;
    }


    @Override
    @Transactional
    public FriendShip getFriendShip(String token, int user_id_two) {
        return friendShipDAO.getFriendShip(new IdExtractor(token).getAuthenticatedUserId(), user_id_two);
    }

    @Override
    @Transactional
    public List<FriendShip> getFriendShipList(String token) {
        return friendShipDAO.getFriendShipList(new IdExtractor(token).getAuthenticatedUserId());
    }

    @Override
    @Transactional
    public FriendShip sendFriendRequest(String token, int friendId) {
        FriendShip result = null;
        if (this.userDAO.getUser(friendId) != null) {
            FriendShip relationship = this.getFriendShip(token, friendId);
            if (relationship != null) {
                int relationship_status = relationship.getStatus();
                throw new NotFoundException(this._getStatus(relationship_status));
            } else {
                int userId = new IdExtractor(token).getAuthenticatedUserId();
                FriendShip friendShip = new FriendShip();
                if (userId < friendId) {
                    friendShip.setFirstUserId(userId);
                    friendShip.setSecondUserId(friendId);
                    friendShip.setStatus(0);
                    friendShip.setActionUserId(userId);
                    result = this.friendShipDAO.sendFriendRequest(friendShip);
                } else if (friendId < userId) {
                    friendShip.setFirstUserId(friendId);
                    friendShip.setSecondUserId(userId);
                    friendShip.setStatus(0);
                    friendShip.setActionUserId(userId);
                    result = this.friendShipDAO.sendFriendRequest(friendShip);
                } else {
                    throw new NotFoundException(userId + " it's the authenticated user Id, scai-chat users can't send requests to themselves");
                }
            }
            return result;
        } else {
            throw new NotFoundException("there's no such user with the id: " + friendId);
        }
    }


    private String _getStatus(int status) {
        //0	Pending  //1 Accepted  // 2 Declined // 3Blocked
        String message;
        switch (status) {
            case 0:
                message = "request already sent relation_ship_status : Pending ";
                break;
            case 1:
                message = "request already accepted relation_ship_status : Accepted";
                break;
            case 2:
                message = "request has been declined relation_ship_status : Declined";
                break;
            case 3:
                message = "you're blocked by the following user relation_ship_status : Blocked";
                break;
            default:
                throw new IllegalStateException("Unexpected value: " + status);
        }
        return message;
    }


}
