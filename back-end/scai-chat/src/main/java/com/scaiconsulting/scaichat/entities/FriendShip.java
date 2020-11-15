package com.scaiconsulting.scaichat.entities;


import javax.persistence.*;

@Entity
@Table(name = "friend_ship")
public class FriendShip {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private int id ;

    @Column(name="friend")
    private int friend ;

    @Column(name="user_id")
    private int userId ;

    @Column(name="type")
    private String type ;

    public FriendShip() {
    }

    public FriendShip(int friend, int userId, String type) {
        this.friend = friend;
        this.userId = userId;
        this.type = type;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getFriend() {
        return friend;
    }

    public void setFriend(int friend) {
        this.friend = friend;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
