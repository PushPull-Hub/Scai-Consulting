package com.scaiconsulting.scaichat.servicesImplemetations;

import com.scaiconsulting.scaichat.DAOs.UserDao;
import com.scaiconsulting.scaichat.entities.InitialUser;
import com.scaiconsulting.scaichat.entities.Profile;
import com.scaiconsulting.scaichat.entities.User;
import com.scaiconsulting.scaichat.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserServiceImplementation implements UserService {

    private UserDao userDao;

    @Autowired
    public UserServiceImplementation(UserDao theUserDao) {
        this.userDao = theUserDao;
    }

    @Override
    @Transactional
    public List<User> getUsers() {
        return userDao.getUsers();
    }

    @Override
    @Transactional
    public void createUser(InitialUser initialUser ) {
        userDao.createUser( initialUser);
    }

    @Override
    @Transactional
    public User getUser(int id) {
        return userDao.getUser(id);
    }

    @Override
    @Transactional
    public User updateUser(User user) {
        return userDao.updateUser(user);
    }

    @Override
    public void deleteUser(int userId) {
        userDao.deleteUser(userId);
    }


}
