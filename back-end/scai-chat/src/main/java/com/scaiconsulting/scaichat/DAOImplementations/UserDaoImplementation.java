package com.scaiconsulting.scaichat.DAOImplementations;

import com.scaiconsulting.scaichat.DAOs.UserDAO;
import com.scaiconsulting.scaichat.DTO.Account;
import com.scaiconsulting.scaichat.entities.Profile;
import com.scaiconsulting.scaichat.entities.User;
import com.scaiconsulting.scaichat.error_handlers.NotFoundException;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
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
    public void createAccount(Account account) {
        Session currentSession = entityManager.unwrap(Session.class);
        User user = account.getUser();
        Profile profile = account.getProfile();
        user.setId(0);
        profile.setId(0);
        profile.setUser(user);
        currentSession.saveOrUpdate(profile);
    }

    @Override
    public Profile getProfile(String email, String password) {
        Profile theProfile = null ;
        Session currentSession = entityManager.unwrap(Session.class);
        Query<Profile> theQuery = currentSession.createQuery("from Profile profile where profile.email = :email and profile.password = :password ");
                theQuery.setParameter("email", email)
                 .setParameter("password", password);
        try{
            theProfile =  theQuery.getSingleResult();
        }
        catch (NoResultException nre ) {
            throw new NotFoundException("bad credentials");
        }
        return theProfile;
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
