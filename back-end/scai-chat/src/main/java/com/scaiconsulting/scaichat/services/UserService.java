package com.scaiconsulting.scaichat.services;

import com.scaiconsulting.scaichat.entities.User;

import java.util.List;

public interface UserService {

    public void createUser(User user);

    public List<User> getUsers();

    public User getUser(int id);

    public User updateUser(User user);

    public void deleteUser(int id);

}
