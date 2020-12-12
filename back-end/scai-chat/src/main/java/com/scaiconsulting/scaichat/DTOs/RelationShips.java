package com.scaiconsulting.scaichat.DTOs;

import com.scaiconsulting.scaichat.entities.FriendShip;

import java.util.ArrayList;

public class RelationShips {

    ArrayList<FriendShip> myFriends;

    ArrayList<FriendShip> PendingRequests;

    ArrayList<FriendShip> blockedMe;

    ArrayList<FriendShip> DeclinedRequests;

    ArrayList<FriendShip> blockedBy;

    ArrayList<FriendShip> Requests ;

    public RelationShips() {
    }

    public RelationShips(ArrayList<FriendShip> myFriends, ArrayList<FriendShip> pendingRequests, ArrayList<FriendShip> blockedMe, ArrayList<FriendShip> declinedRequests, ArrayList<FriendShip> blockedBy, ArrayList<FriendShip> requests) {
        this.myFriends = myFriends;
        PendingRequests = pendingRequests;
        this.blockedMe = blockedMe;
        DeclinedRequests = declinedRequests;
        this.blockedBy = blockedBy;
        Requests = requests;
    }

    public ArrayList<FriendShip> getMyFriends() {
        return myFriends;
    }

    public void setMyFriends(ArrayList<FriendShip> myFriends) {
        this.myFriends = myFriends;
    }

    public ArrayList<FriendShip> getPendingRequests() {
        return PendingRequests;
    }

    public void setPendingRequests(ArrayList<FriendShip> pendingRequests) {
        PendingRequests = pendingRequests;
    }

    public ArrayList<FriendShip> getBlockedMe() {
        return blockedMe;
    }

    public void setBlockedMe(ArrayList<FriendShip> blockedMe) {
        this.blockedMe = blockedMe;
    }

    public ArrayList<FriendShip> getDeclinedRequests() {
        return DeclinedRequests;
    }

    public void setDeclinedRequests(ArrayList<FriendShip> declinedRequests) {
        DeclinedRequests = declinedRequests;
    }

    public ArrayList<FriendShip> getBlockedBy() {
        return blockedBy;
    }

    public void setBlockedBy(ArrayList<FriendShip> blockedBy) {
        this.blockedBy = blockedBy;
    }

    public ArrayList<FriendShip> getRequests() {
        return Requests;
    }

    public void setRequests(ArrayList<FriendShip> requests) {
        Requests = requests;
    }
}
