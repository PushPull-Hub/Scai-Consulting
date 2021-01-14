package com.scaiconsulting.scaichat.servicesImplemetations;

import com.scaiconsulting.scaichat.DAOs.FriendShipDAO;
import com.scaiconsulting.scaichat.DAOs.UserDAO;
import com.scaiconsulting.scaichat.DTOs.MiniUserProfile;
import com.scaiconsulting.scaichat.DTOs.RelationShips;
import com.scaiconsulting.scaichat.configurations.IdExtractor;
import com.scaiconsulting.scaichat.entities.FriendShip;
import com.scaiconsulting.scaichat.entities.User;
import com.scaiconsulting.scaichat.exeptions.NotFoundException;
import com.scaiconsulting.scaichat.services.FriendShipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
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
        return friendShipDAO.getRelationShipShipList(new IdExtractor(token).getAuthenticatedUserId());
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
                    friendShip.setId(0);
                    friendShip.setFirstUserId(userId);
                    friendShip.setSecondUserId(friendId);
                    friendShip.setStatus(0);
                    friendShip.setActionUserId(userId);
                    result = this.friendShipDAO.sendFriendRequest(friendShip);
                } else if (friendId < userId) {
                    friendShip.setId(0);
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


    @Override
    @Transactional
    public boolean cancelFriendRequest(String token, int friendId) {
        FriendShip theRelationShip = this.getFriendShip(token, friendId);
        if (theRelationShip != null) {
            int userId = new IdExtractor(token).getAuthenticatedUserId();
            if (theRelationShip.getFirstUserId() == userId || theRelationShip.getSecondUserId() == userId) {
                return this.friendShipDAO.deleteFriendShip(theRelationShip.getId()) > 0;

            } else {
                throw new NotFoundException("you're not allow to perform such a operation ");
            }
        } else {
            throw new NotFoundException("from cancelFriendRequest method : relation with friend id of " + friendId + " not found ");
        }
    }

    @Override
    @Transactional
    public List<MiniUserProfile> getTenSuggestions(String token) {
        int userId = new IdExtractor(token).getAuthenticatedUserId();
        List<User> users = this.friendShipDAO.getTenFriendsSuggestions(userId);
        ArrayList<MiniUserProfile> suggestedProfiles = new ArrayList<>();
        if (users != null) {
            for (User user : users) {
                suggestedProfiles.add(this.userDAO.getMiniUserProfile(user.getId()));
            }
        }
        return suggestedProfiles ;
    }

    @Override
    @Transactional
    public FriendShip acceptFriendRequest(String token, int requesterId) {

        if (this.userDAO.getUser(requesterId) != null) {
            FriendShip friendShip = this.getFriendShip(token, requesterId);
            if (friendShip.getStatus() == 0) {
                int userId = new IdExtractor(token).getAuthenticatedUserId();
                friendShip.setStatus(1);
                friendShip.setActionUserId(userId);
                return this.friendShipDAO.acceptFriendRequest(friendShip);
            } else {
                throw new NotFoundException(_getStatus(friendShip.getStatus()));
            }

        } else {
            throw new NotFoundException("there's no such user with id: " + requesterId);
        }


    }

    @Override
    @Transactional
    public boolean DeclineFriendRequest(String token, int requesterId) {
        FriendShip friendShip = this.getFriendShip(token, requesterId);
        if (friendShip != null) {
            return this.friendShipDAO.deleteFriendShip(friendShip.getId()) > 0;
        } else throw new NotFoundException("can't find such a relation between you and user Id :" + requesterId);
    }

    @Override
    @Transactional
    public List<FriendShip> getPendingFriendRequests(String token) {
        int userId = new IdExtractor(token).getAuthenticatedUserId();
        return friendShipDAO.getPendingFriendRequests(userId);
    }

    @Override
    @Transactional
    public FriendShip updateFriendShip(FriendShip friendShip) {
        return friendShipDAO.updateFriendShip(friendShip);
    }

    @Override
    @Transactional
    public boolean blockFriend(String token, int friendId) {
        if (userDAO.getUser(friendId) != null) {
            int userId = new IdExtractor(token).getAuthenticatedUserId();
            if (userId != friendId) {
                FriendShip friendShip = friendShipDAO.getFriendShip(userId, friendId);
                if (friendShip.getStatus() != 3) {
                    friendShip.setStatus(3);
                    friendShip.setActionUserId(userId);
                    FriendShip theNewFriendshipModel = friendShipDAO.updateFriendShip(friendShip);
                    return theNewFriendshipModel.getStatus() == 3;
                } else if (friendShip.getStatus() == 3 && friendShip.getActionUserId() == friendId) {
                    throw new NotFoundException(_getStatus(friendShip.getStatus()));
                } else throw new NotFoundException("you've already blocked the user with id: " + friendId);
            } else throw new NotFoundException("scai-chat users can't block themselves ");
        } else throw new NotFoundException("there's no such a user with the id: " + friendId);
    }

    @Override
    @Transactional
    public boolean unblockFriend(String token, int friendId) {
        if (userDAO.getUser(friendId) != null) {
            int userId = new IdExtractor(token).getAuthenticatedUserId();
            if (userId != friendId) {
                FriendShip friendShip = friendShipDAO.getFriendShip(userId, friendId);
                if (friendShip.getStatus() == 3) {
                    friendShip.setStatus(1);
                    friendShip.setActionUserId(userId);
                    FriendShip theNewFriendshipModel = friendShipDAO.updateFriendShip(friendShip);
                    return theNewFriendshipModel.getStatus() == 1;
                } else if (friendShip.getStatus() == 5 && friendShip.getActionUserId() == friendId) {
                    throw new NotFoundException(_getStatus(friendShip.getStatus()));
                } else throw new NotFoundException("you've already blocked the user with id: " + friendId);
            } else throw new NotFoundException("scai-chat users can't block themselves ");
        } else throw new NotFoundException("there's no such a user with the id: " + friendId);
    }


    @Override
    @Transactional
    public RelationShips getRelationShips(String token) {
        int userId = new IdExtractor(token).getAuthenticatedUserId();
        List<FriendShip> allUserRelationShips = getFriendShipList(token);
        RelationShips relationShipsWrapper = new RelationShips();
        relationShipsWrapper.setMyFriends(new ArrayList<>());
        relationShipsWrapper.setPendingRequests(new ArrayList<>());
        relationShipsWrapper.setBlockedMe(new ArrayList<>());
        relationShipsWrapper.setBlockedBy(new ArrayList<>());
        relationShipsWrapper.setDeclinedRequests(new ArrayList<>());
        relationShipsWrapper.setRequests(new ArrayList<>());

        for (FriendShip allUserRelationShip : allUserRelationShips) {
            int status = allUserRelationShip.getStatus();
            switch (status) {
                case 0:
                    if (allUserRelationShip.getActionUserId() != userId) {
                        relationShipsWrapper.getRequests().add(allUserRelationShip);
                    } else if (allUserRelationShip.getActionUserId() == userId) {
                        relationShipsWrapper.getPendingRequests().add(allUserRelationShip);
                    }
                    break;
                case 1:
                    relationShipsWrapper.getMyFriends().add(allUserRelationShip);
                    break;
                case 2:
                    relationShipsWrapper.getDeclinedRequests().add(allUserRelationShip);
                    break;
                case 3:
                    if (allUserRelationShip.getActionUserId() == userId) {
                        relationShipsWrapper.getBlockedBy().add(allUserRelationShip);
                    } else if (allUserRelationShip.getActionUserId() != userId)
                        relationShipsWrapper.getBlockedMe().add(allUserRelationShip);
                    break;
                default:
                    throw new IllegalStateException("Unexpected value: " + status);
            }
        }


        return relationShipsWrapper;
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
