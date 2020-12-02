package com.scaiconsulting.scaichat.services;

import com.scaiconsulting.scaichat.entities.FriendShip;

public interface FriendShipService {


    FriendShip getFriendShip(String token, int user_id_two);

    FriendShip sendFriendRequest(String token, int friend);


}
