package com.scaiconsulting.scaichat.DAOImplementations;

import com.scaiconsulting.scaichat.DAOs.UserDAO;
import com.scaiconsulting.scaichat.entities.Profile;
import com.scaiconsulting.scaichat.entities.User;
import com.scaiconsulting.scaichat.exeptions.NotFoundException;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import java.util.List;

@Repository
public class UserDAOImplementation implements UserDAO {

    private final EntityManager entityManager;

    @Autowired
    public UserDAOImplementation(EntityManager theEntityManager) {
        this.entityManager = theEntityManager;
    }

    @Override
    public User createProfile(Profile profile) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        Session currentSession = entityManager.unwrap(Session.class);
        profile.setId(0);
        profile.getUser().setId(0);
        profile.setPassword(encoder.encode(profile.getPassword()));
        currentSession.saveOrUpdate(profile);
        return profile.getUser();
    }

    @Override
    public Profile getProfile(String email, String password) {
        Profile profile = null;
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        Session currentSession = entityManager.unwrap(Session.class);
        Query<Profile> theQuery = currentSession.createQuery("from Profile profile where profile.email = :email")
                .setParameter("email", email);

        try {
            Profile testedProfile = theQuery.getSingleResult();
            boolean isPasswordMatch = encoder.matches(password, testedProfile.getPassword());
            if (!isPasswordMatch) {
                profile = testedProfile ;
            }
        } catch (NoResultException nre) {
            throw new NotFoundException("bad credentials");
        }

        return profile;
    }

    @Override
    public List<User> getUsers() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<User> theQuery = currentSession.createQuery("from User", User.class);
        return theQuery.getResultList();
    }

    @Override
    public User getUser(int id) {
        Session currentSession = entityManager.unwrap(Session.class);
        return currentSession.get(User.class, id);
    }

    @Override
    public User updateUser(User user) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.saveOrUpdate(user);
        return user;
    }

    @Override
    public Profile updateProfile(Profile profile) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.saveOrUpdate(profile);
        return profile;
    }


}
