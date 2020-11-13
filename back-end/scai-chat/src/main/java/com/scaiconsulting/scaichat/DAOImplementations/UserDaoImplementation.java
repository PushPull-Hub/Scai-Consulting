package com.scaiconsulting.scaichat.DAOImplementations;

import com.scaiconsulting.scaichat.DAOs.UserDAO;
import com.scaiconsulting.scaichat.entities.Account;
import com.scaiconsulting.scaichat.entities.Profile;
import com.scaiconsulting.scaichat.entities.User;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
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
        user.setProfile(profile);
        currentSession.saveOrUpdate(user);
    }

    @Override
    public User getUser(String email, String password) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<User> theQuery = currentSession.createQuery("from User user where user.email = :email and user.password = :password ")
                .setParameter("email", email)
                .setParameter("password", password);
        return theQuery.getSingleResult();
    }

    @Override
    public List<Profile> getProfiles() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<Profile> theQuery = currentSession.createQuery("from Profile", Profile.class);
        return theQuery.getResultList();
    }

    @Override
    public Profile getProfile(int id) {
         Session currentSession = entityManager.unwrap(Session.class);
        return currentSession.get(Profile.class, id);
        /*Session currentSession = entityManager.unwrap(Session.class);
        Query<Profile> theQuery = currentSession.createQuery("from Profile p "
                + "JOIN FETCH  p.posts "
                + "where p.id=:profileId", Profile.class)
                .setParameter("profileId",id );

        return theQuery.getSingleResult();*/
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
