package com.scaiconsulting.scaichat.services;

import com.scaiconsulting.scaichat.configurations.MiniUserProfile;
import com.scaiconsulting.scaichat.entities.Profile;
import com.scaiconsulting.scaichat.entities.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {

    User signUp(Profile profile);

    ResponseEntity<User> getProfile(String email, String password);

    Profile updateProfile(Profile profile);

    List<User> getUsers();

    User getUser(int id);

    User updateUser(User user);

    MiniUserProfile getMiniUserProfile(int id);

    Profile verifyEmail(String email);

}
