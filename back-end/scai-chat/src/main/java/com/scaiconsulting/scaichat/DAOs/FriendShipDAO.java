package com.scaiconsulting.scaichat.DAOs;

import com.scaiconsulting.scaichat.entities.FriendShip;
import com.scaiconsulting.scaichat.entities.User;

import java.util.List;

public interface FriendShipDAO {

    List<FriendShip> getFriendShipList(int userId);

    FriendShip getFriendShipByItsId(int id);

    FriendShip getFriendShipByFriendId(int friendId);

    FriendShip createFriendShip(FriendShip friendShip);

    List<User> getTenFriendsSuggestion(int userId);

}
