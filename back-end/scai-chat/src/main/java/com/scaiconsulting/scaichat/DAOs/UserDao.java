package com.scaiconsulting.scaichat.DAOs;

import com.scaiconsulting.scaichat.DTO.Account;
import com.scaiconsulting.scaichat.entities.Profile;
import com.scaiconsulting.scaichat.entities.User;

import java.util.List;

public interface UserDAO {

    public User createProfile(Profile profile);

    public Profile getProfile(String email, String password);

    public Profile updateProfile(Profile profile);

    public List<User> getUsers();

    public User getUser(int id);

    public User updateUser(User user);


}
