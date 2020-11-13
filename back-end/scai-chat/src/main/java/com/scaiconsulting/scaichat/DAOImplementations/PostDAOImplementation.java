package com.scaiconsulting.scaichat.DAOImplementations;

import com.scaiconsulting.scaichat.DAOs.PostDAO;
import com.scaiconsulting.scaichat.entities.Post;
import com.scaiconsulting.scaichat.entities.PostComment;
import com.scaiconsulting.scaichat.entities.Profile;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;


@Repository
public class PostDAOImplementation implements PostDAO {

    private final EntityManager entityManager;

    @Autowired
    public PostDAOImplementation(EntityManager entityManager) {
        this.entityManager = entityManager;

    }

    @Override
    public Post createPost(Post post) {
        Profile profile = new Profile();
        profile.setId(post.getProfile().getId());
        post.setProfile(profile);
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.saveOrUpdate(post);
        return post;
    }

    @Override
    public List<Post> getPosts(int profileId) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<Post> theQuery = currentSession.createQuery("from Post  where profile_id = :profileId", Post.class)
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
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.update(post);
        return post;
    }

    @Override
    public void deletePost(int postId) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<Post> theQuery = currentSession.createQuery("delete from Post where id = :postId");
        theQuery.setParameter("postId", postId);
        theQuery.executeUpdate();
    }

    @Override
    public List<Post> getFriendsPosts() {
        return null;
    }

    @Override
    public PostComment commentOnPost(PostComment comment) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.saveOrUpdate(comment);
        return comment;
    }

    @Override
    public List<PostComment> getPostComments(int postId) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<PostComment> theQuery = currentSession.createQuery("from PostComment  ", PostComment.class);
        return theQuery.getResultList();
    }


}
