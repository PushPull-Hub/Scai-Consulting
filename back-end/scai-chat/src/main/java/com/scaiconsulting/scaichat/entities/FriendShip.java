package com.scaiconsulting.scaichat.entities;


import javax.persistence.*;

@Entity
@Table(name = "friend_ship")
public class FriendShip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "user_id_1")
        private int firstUserId;

    @Column(name = "user_id_2")
    private int secondUserId;

    @Column(name = "type")
    private String type;

    public FriendShip() {
    }

    public FriendShip(int firstUserId, int secondUserId, String type) {
        this.firstUserId = firstUserId;
        this.secondUserId = secondUserId;
        this.type = type;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getFirstUserId() {
        return firstUserId;
    }

    public void setFirstUserId(int firstUserId) {
        this.firstUserId = firstUserId;
    }

    public int getSecondUserId() {
        return secondUserId;
    }

    public void setSecondUserId(int secondUserId) {
        this.secondUserId = secondUserId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }


}
