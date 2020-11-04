package com.scaiconsulting.scaichat.services;

import com.scaiconsulting.scaichat.entities.User;

import java.util.List;

public interface UserService {

    public List<User> getUsers();

    public void createUser(User user);

    public User getUser(int id);

    public void updateUser(int id);

    public void deleteUpdate(int id );

}
