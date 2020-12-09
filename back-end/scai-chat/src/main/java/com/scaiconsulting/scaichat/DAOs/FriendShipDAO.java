package com.scaiconsulting.scaichat.DAOs;

import com.scaiconsulting.scaichat.entities.FriendShip;

import java.util.List;

public interface FriendShipDAO {

    FriendShip getFriendShip(int user_id_one, int user_id_two);

    FriendShip sendFriendRequest(FriendShip friendShip);

    List<FriendShip> getFriendShipList(int userId);

    FriendShip acceptFriendRequest(FriendShip friendShip);

    List<FriendShip> getPendingFriendRequests(int userId);

    FriendShip updateFriendShip(FriendShip friendShip);

    int deleteFriendShip (int id );

}
