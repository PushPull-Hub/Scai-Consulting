package com.scaiconsulting.scaichat.services;

import com.scaiconsulting.scaichat.entities.Account;
import com.scaiconsulting.scaichat.entities.Profile;
import com.scaiconsulting.scaichat.entities.User;

import java.util.List;

public interface UserService {

    public void createUser(Account account);

    public List<User> getUsers();

    public List<Profile> getProfiles();

    public User getUser(int id);

    public User updateUser(User user);

    public void deleteUser(int id);

}
