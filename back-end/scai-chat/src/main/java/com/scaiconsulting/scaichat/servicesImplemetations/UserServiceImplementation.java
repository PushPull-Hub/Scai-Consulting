package com.scaiconsulting.scaichat.servicesImplemetations;

import com.scaiconsulting.scaichat.DAOs.UserDao;
import com.scaiconsulting.scaichat.entities.Account;
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
    public void createUser(Account account) {
        userDao.createAccount(account);
    }

    @Override
    @Transactional
    public User getUser(int id) {
        return userDao.getUser(id);
    }

    @Override
    @Transactional
    public List<Profile> getProfiles() {
        return userDao.getProfiles();
    }

    @Override
    public Profile getProfile(int id) {
        return userDao.getProfile(id) ;
    }

    @Override
    @Transactional
    public User updateUser(User user) {
        return userDao.updateUser(user);
    }

}
