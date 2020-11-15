package com.scaiconsulting.scaichat.entities;

import javax.persistence.*;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "first_name")
    private String firstName ;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "gender")
    private String gender;

    @Column(name = "is_active")
    private boolean active;

    @Column(name = "about")
    private String about;

    @Column(name = "birthday")
    private String birthday;

    @Column(name = "hometown")
    private String hometown;

    @Column(name = "address")
    private String address;

    @Column(name = "location")
    private String location;

    @Column(name = "work_in")
    private String workIn;

    @Column(name = "relationship_status")
    private String relationshipStatus;


    public User() {

    }

    public User(String firstName, String lastName, String gender, boolean active, String about, String birthday, String hometown, String address, String location, String workIn, String relationshipStatus) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.active = active;
        this.about = about;
        this.birthday = birthday;
        this.hometown = hometown;
        this.address = address;
        this.location = location;
        this.workIn = workIn;
        this.relationshipStatus = relationshipStatus;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public String getHometown() {
        return hometown;
    }

    public void setHometown(String hometown) {
        this.hometown = hometown;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getWorkIn() {
        return workIn;
    }

    public void setWorkIn(String workIn) {
        this.workIn = workIn;
    }

    public String getRelationshipStatus() {
        return relationshipStatus;
    }

    public void setRelationshipStatus(String relationshipStatus) {
        this.relationshipStatus = relationshipStatus;
    }

}
