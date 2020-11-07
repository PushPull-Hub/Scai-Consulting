package com.scaiconsulting.scaichat.DAOImplementations;

import com.scaiconsulting.scaichat.DAOs.UserDao;
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
public class UserDaoImplementation implements UserDao {

    private EntityManager entityManager;

    @Autowired
    public UserDaoImplementation(EntityManager theEntityManager) {
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
    public User getUser(int id) {
        Session currentSession = entityManager.unwrap(Session.class);
        User user = currentSession.get(User.class, id);
        return user;
    }

    @Override
    public List<Profile> getProfiles() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<Profile> theQuery = currentSession.createQuery("from Profile", Profile.class);
        List<Profile> profiles = theQuery.getResultList();
        return profiles;
    }

    @Override
    public Profile getProfile(int id) {
        Session currentSession = entityManager.unwrap(Session.class);
        Profile profile = currentSession.get(Profile.class, id);
        return profile;
    }

    @Override
    public User updateUser(User user) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.saveOrUpdate(user);
        return user;
    }

}
