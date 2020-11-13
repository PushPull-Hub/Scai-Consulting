package com.scaiconsulting.scaichat.DAOImplementations;

import com.scaiconsulting.scaichat.DAOs.PostDAO;
import com.scaiconsulting.scaichat.entities.Post;
import com.scaiconsulting.scaichat.entities.PostComment;
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
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.saveOrUpdate(post);
        return post;
    }

    @Override
    public List<Post> getPosts(int profileId) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<Post> theQuery = currentSession.createQuery(" from Post where profileId = :profileId", Post.class)
                .setParameter("profileId", profileId);
        return theQuery.getResultList();
    }

    @Override
    public Post getPost(int postId) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<Post> theQuery = currentSession.createQuery("from Post post where post.id = :postId")
                .setParameter("postId", postId);
        return theQuery.getSingleResult();

      /*Query<Post> theQuery =  currentSession.createQuery("from Post p "
                + "join fetch  p.profile "
                + "where p.id=:postId", Post.class)
                .setParameter("postId",postId );
        return theQuery.getSingleResult();
        */

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
        Query<PostComment> theQuery = currentSession.createQuery("from PostComment where post_id = :postId  ", PostComment.class)
                .setParameter("postId", postId);
        return theQuery.getResultList();
    }


}
