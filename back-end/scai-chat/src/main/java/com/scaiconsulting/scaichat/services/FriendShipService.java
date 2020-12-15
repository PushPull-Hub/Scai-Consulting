package com.scaiconsulting.scaichat.services;

import com.scaiconsulting.scaichat.DTOs.MiniUserProfile;
import com.scaiconsulting.scaichat.DTOs.RelationShips;
import com.scaiconsulting.scaichat.entities.FriendShip;

import java.util.List;

public interface FriendShipService {

    RelationShips getRelationShips(String token);

    FriendShip getFriendShip(String token, int user_id_two);

    FriendShip sendFriendRequest(String token, int friend);

    List<FriendShip> getFriendShipList(String token);

    FriendShip acceptFriendRequest(String token, int requesterId);

    boolean DeclineFriendRequest (String token, int requesterId);

    List<FriendShip> getPendingFriendRequests(String token);

    FriendShip updateFriendShip(FriendShip friendShip);

    boolean blockFriend(String token, int friendId);

    boolean unblockFriend(String token, int friendId);

    boolean cancelFriendRequest (String token , int friendShipId);

    List<MiniUserProfile> getTenSuggestions (String token ) ;

}
