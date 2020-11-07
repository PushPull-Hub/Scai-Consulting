package com.scaiconsulting.scaichat.DAOs;

import com.scaiconsulting.scaichat.entities.Account;
import com.scaiconsulting.scaichat.entities.Profile;
import com.scaiconsulting.scaichat.entities.User;

import java.util.List;

public interface UserDao {

//    public void createUser(User user);

    public void createUser(Account account);

    public List<User> getUsers();

    public User getUser(int id);

    public List<Profile> getProfiles ();

    public User updateUser(User user);

    public void deleteUser(int userId);

}
