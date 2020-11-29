package com.scaiconsulting.scaichat.DAOs;

import com.scaiconsulting.scaichat.entities.FriendShip;

import java.util.List;

public interface FriendShipDAO {

    List<FriendShip> getFriendShipList(int userId);

    FriendShip getFriendShipByItsId (int id) ;

    FriendShip getFriendShipByFriendId (int friendId) ;

    FriendShip createFriendShip ( FriendShip friendShip ) ;

    List<FriendShip>  getTenFriendsSuggestion(int userId);

}