package com.scaiconsulting.scaichat.servicesImplemetations;

import com.scaiconsulting.scaichat.DAOs.UserDAO;
import com.scaiconsulting.scaichat.DTOs.MiniUserProfile;
import com.scaiconsulting.scaichat.entities.Profile;
import com.scaiconsulting.scaichat.entities.User;
import com.scaiconsulting.scaichat.services.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashMap;
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
    public User signUp(Profile profile) {
        return userDao.createProfile(profile);
    }

    @Override
    @Transactional
    public ResponseEntity<User> getProfile(String email, String password) {
        Profile AuthenticatedProfile = userDao.getProfile(email, password);
        if (AuthenticatedProfile != null) {
            HttpHeaders headers = new HttpHeaders();
            HashMap<String, Object> addedValues = new HashMap<String, Object>();
            addedValues.put("id", AuthenticatedProfile.getUser().getId());
            String token = Jwts.builder()
                    .addClaims(addedValues)
                    .setIssuedAt(new Date(System.currentTimeMillis()))
                    .setExpiration(new Date(System.currentTimeMillis() + 60 * 60 * 24000))
                    .signWith(SignatureAlgorithm.HS512, "scaiconsulting").compact();
            headers.add("Authentication", "Bearer" + token);
            return ResponseEntity.ok().headers(headers).body(AuthenticatedProfile.getUser());
        } else {
            return null;
        }
    }

    @Override
    @Transactional
    public Profile updateProfile(Profile profile) {
        return userDao.updateProfile(profile);
    }

    @Override
    @Transactional
    public List<User> getUsers() {
        return userDao.getUsers();
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
    public MiniUserProfile getMiniUserProfile(int id) {
        return userDao.getMiniUserProfile(id);
    }

    @Override
    public Profile verifyEmail(String email) {
        return this.userDao.verifyEmail(email);
    }
}
