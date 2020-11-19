package com.scaiconsulting.scaichat.services;

import com.scaiconsulting.scaichat.entities.Profile;
import com.scaiconsulting.scaichat.entities.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {

    public User signUp(Profile profile);

    public ResponseEntity<User> getProfile(String email, String password);

    public Profile updateProfile(Profile profile);

    public List<User> getUsers();

    public User getUser(int id);

    public User updateUser(User user);


}
