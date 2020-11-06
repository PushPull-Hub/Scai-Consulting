package com.scaiconsulting.scaichat.entities;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name ="profile")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id ;

    @Column(name="first_name")
    private String firstName ;

    @Column(name="last_name")
    private String lastName  ;

    @Column(name="gender")
    private String gender ;

    @Column(name="is_active")
    private boolean isActive ;

  /*  @Column(name="friends")
    private List<String> friends ;*/

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="user_id")
    private User user ;

    public Profile() {

    }

    public Profile(String firstName, String lastName, String gender, boolean isActive, List<String> friends, User user) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.isActive = isActive;
//        this.friends = friends;
        this.user = user;
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
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

  /*  public List<String> getFriends() {
        return friends;
    }

    public void setFriends(List<String> friends) {
        this.friends = friends;
    }

   */

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
