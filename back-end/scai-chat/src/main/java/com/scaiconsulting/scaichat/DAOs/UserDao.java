package com.scaiconsulting.scaichat.DAOs;

import com.scaiconsulting.scaichat.DTOs.MiniUserProfile;
import com.scaiconsulting.scaichat.entities.Profile;
import com.scaiconsulting.scaichat.entities.User;

import java.util.List;

public interface UserDAO {

    User createProfile(Profile profile);

    Profile getProfile(String email, String password);

    Profile updateProfile(Profile profile);

    List<User> getUsers();

    User getUser(int id);

    User updateUser(User user);

    MiniUserProfile getMiniUserProfile(int id);

    Profile verifyEmail(String email);

}
