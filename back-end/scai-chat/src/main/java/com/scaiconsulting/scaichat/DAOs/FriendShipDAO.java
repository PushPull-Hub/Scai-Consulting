package com.scaiconsulting.scaichat.DAOs;

import com.scaiconsulting.scaichat.entities.FriendShip;

public interface FriendShipDAO {

    FriendShip getFriendShip(int user_id_one, int user_id_two);

    FriendShip sendFriendRequest(FriendShip friendShip);


}
