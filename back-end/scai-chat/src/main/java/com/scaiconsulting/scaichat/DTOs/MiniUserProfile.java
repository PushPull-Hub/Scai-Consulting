package com.scaiconsulting.scaichat.DTOs;

public class MiniUserProfile {

    private int Id;
    private String firstName;
    private String lastName;
    private String gender;
    private boolean active;
    private String profilePictureUrl;


    public MiniUserProfile() {
    }

    public MiniUserProfile(int id, String firstName, String lastName, String gender, boolean active, String profilePictureUrl) {
        Id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.active = active;
        this.profilePictureUrl = profilePictureUrl;
    }

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getProfilePictureUrl() {
        return profilePictureUrl;
    }

    public void setProfilePictureUrl(String profilePictureUrl) {
        this.profilePictureUrl = profilePictureUrl;
    }
}
