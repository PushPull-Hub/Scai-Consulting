package com.scaiconsulting.scaichat.DAOs;

import com.scaiconsulting.scaichat.entities.FriendShip;

import java.util.List;

public interface FriendShipDAO {

    List<FriendShip> getFriendShipList(int userId);




}
