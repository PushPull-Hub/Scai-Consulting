package com.scaiconsulting.scaichat.services;

import com.scaiconsulting.scaichat.entities.FriendShip;

import java.util.List;

public interface FriendShipService {

    public List<FriendShip> getFriendShipList(int userId);
}
