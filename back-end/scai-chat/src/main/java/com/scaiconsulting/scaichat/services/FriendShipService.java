package com.scaiconsulting.scaichat.services;

import com.scaiconsulting.scaichat.entities.FriendShip;

import java.util.List;

public interface FriendShipService {

    List<FriendShip> getFriendShipList(int userId);

    FriendShip getFriendShipByItsId(int id);

    FriendShip getFriendShipByFriendId(int friend);

    FriendShip createFriendShip(String token, int userId2);

    List<FriendShip> getTenFriendsSuggestion(String token );

}