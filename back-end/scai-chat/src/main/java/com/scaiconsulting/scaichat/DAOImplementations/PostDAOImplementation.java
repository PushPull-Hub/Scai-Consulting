package com.scaiconsulting.scaichat.DAOImplementations;

import com.scaiconsulting.scaichat.DAOs.PostDAO;
import com.scaiconsulting.scaichat.entities.Post;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;


@Repository
public class PostDAOImplementation implements PostDAO {

    private EntityManager entityManager;

    @Autowired
    public PostDAOImplementation(EntityManager theEntityManager) {
        this.entityManager = theEntityManager;
    }

    @Override
    public Post createPost(Post post) {
        Session currentSession = entityManager.unwrap(Session.class);
        Post thePost = post;
        currentSession.saveOrUpdate(post);
        return post;
    }

    @Override
    public List<Post> getPosts(int profileId) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<Post> theQuery = currentSession.createQuery("from Post post where post.profile_id = : profileId", Post.class)
                .setParameter("profileId", profileId);
        List<Post> posts = theQuery.getResultList();
        return posts;
    }


    @Override
    public Post getPost(int postId) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<Post> theQuery = currentSession.createQuery("from Post post where post.id = :postId")
                .setParameter("postId", postId);
        Post post = theQuery.getSingleResult();
        return post;
    }

    @Override
    public Post updatePost(Post post) {
        return null;
    }

    @Override
    public String deletePost(int postId) {
        return null;
    }

    @Override
    public List<Post> getFriendsPosts() {
        return null;
    }


}
