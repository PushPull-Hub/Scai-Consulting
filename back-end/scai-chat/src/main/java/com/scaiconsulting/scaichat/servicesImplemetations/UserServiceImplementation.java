package com.scaiconsulting.scaichat.servicesImplemetations;

import com.scaiconsulting.scaichat.DAOs.UserDao;
import com.scaiconsulting.scaichat.entities.User;
import com.scaiconsulting.scaichat.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class UserServiceImplementation implements UserService {

    private UserDao userDao ;

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
    public void createUser(User user) {


    }

    @Override
    @Transactional
    public User getUser(int Id) {
        return null;
    }


    @Override
    @Transactional
    public void updateUser(int id ) {

    }

    @Override
    public void deleteUpdate(int id ) {

    }
}
