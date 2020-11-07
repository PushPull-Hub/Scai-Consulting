package com.scaiconsulting.scaichat.entities;

import javax.persistence.*;
import java.util.List;

@Embeddable
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id ;
    private User user ;
    private Profile profile ;

    public Account() {

    }

    public Account(User user, Profile profile) {
        this.user = user;
        this.profile = profile;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Profile getProfile() {
        return profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
