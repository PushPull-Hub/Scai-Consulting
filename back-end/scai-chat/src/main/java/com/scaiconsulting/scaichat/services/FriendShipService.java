package com.scaiconsulting.scaichat.services;

import com.scaiconsulting.scaichat.entities.FriendShip;

import java.util.List;

public interface FriendShipService {

    FriendShip getFriendShip(String token, int user_id_two);

    FriendShip sendFriendRequest(String token, int friend);

    List<FriendShip> getFriendShipList(String token);

}
