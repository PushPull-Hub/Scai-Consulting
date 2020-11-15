package com.scaiconsulting.scaichat.servicesImplemetations;

import com.scaiconsulting.scaichat.DAOs.UserDAO;
import com.scaiconsulting.scaichat.DTO.Account;
import com.scaiconsulting.scaichat.entities.Profile;
import com.scaiconsulting.scaichat.entities.User;
import com.scaiconsulting.scaichat.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserServiceImplementation implements UserService {

    private final UserDAO userDao;

    @Autowired
    public UserServiceImplementation(UserDAO theUserDAO) {
        this.userDao = theUserDAO;
    }


    @Override
    @Transactional
    public void createAccount(Account account) {
         userDao.createAccount(account);
    }

    @Override
    @Transactional
    public Profile getProfile(String email, String password) {
        return userDao.getProfile(email,password);
    }

    @Override
    @Transactional
    public Profile updateProfile(Profile profile) {
        return userDao.updateProfile(profile) ;
    }

    @Override
    @Transactional
    public List<User> getUsers() {
        return userDao.getUsers() ;
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
}
