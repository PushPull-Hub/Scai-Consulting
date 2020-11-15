package com.scaiconsulting.scaichat.DTO;

import com.scaiconsulting.scaichat.entities.Profile;
import com.scaiconsulting.scaichat.entities.User;

//DTO
public class Account {

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

}