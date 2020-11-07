package com.scaiconsulting.scaichat.DAOs;

import com.scaiconsulting.scaichat.entities.Account;
import com.scaiconsulting.scaichat.entities.Profile;
import com.scaiconsulting.scaichat.entities.User;

import java.util.List;

public interface UserDao {

    public void createAccount(Account account);

    public User getUser(String email, String password);

    public List<Profile> getProfiles();

    public Profile getProfile(int id);

    public User updateUser(User user);

    public Profile updateProfile(Profile profile);

}
