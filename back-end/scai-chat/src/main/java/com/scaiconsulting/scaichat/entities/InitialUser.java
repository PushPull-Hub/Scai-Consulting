package com.scaiconsulting.scaichat.entities;

import javax.persistence.*;
import java.util.List;

@Embeddable
public class InitialUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id ;
    private User user ;
    private Profile profile ;

    public InitialUser() {

    }

    public InitialUser(User user, Profile profile) {
        profile.setUser(user);
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
