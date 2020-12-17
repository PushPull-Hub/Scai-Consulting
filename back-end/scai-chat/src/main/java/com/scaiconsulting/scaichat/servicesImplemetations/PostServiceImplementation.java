package com.scaiconsulting.scaichat.servicesImplemetations;

import com.scaiconsulting.scaichat.DAOs.PostDAO;
import com.scaiconsulting.scaichat.configurations.IdExtractor;
import com.scaiconsulting.scaichat.entities.Post;
import com.scaiconsulting.scaichat.entities.PostComment;
import com.scaiconsulting.scaichat.entities.PostLike;
import com.scaiconsulting.scaichat.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;


@Service
public class PostServiceImplementation implements PostService {

    private final PostDAO postDAO;

    @Autowired
    public PostServiceImplementation(PostDAO postDAO) {
        this.postDAO = postDAO;
    }

    @Override
    @Transactional
    public Post createPost(Post post) {
        return postDAO.createPost(post);
    }

    @Override
    @Transactional
    public List<Post> getPosts(int profileId) {
        return postDAO.getPosts(profileId);
    }

    @Override
    @Transactional
    public Post getPost(int postId) {
        return postDAO.getPost(postId);
    }

    @Override
    @Transactional
    public Post updatePost(Post post) {
        return postDAO.updatePost(post);
    }

    @Override
    @Transactional
    public void deletePost(int postId) {
        postDAO.deletePost(postId);
    }

    @Override
    @Transactional
    public PostComment commentOnPost(PostComment comment) {
        return postDAO.commentOnPost(comment);
    }

    @Override
    @Transactional
    public List<PostComment> getPostComments(int postId) {
        return postDAO.getPostComments(postId);
    }

    @Override
    @Transactional
    public Set<PostLike> likePost(String token, int postId) {
        return postDAO.likePost(new IdExtractor(token).getAuthenticatedUserId(), postId);
    }

    @Override
    @Transactional
    public Set<PostLike> unlikePost(String token, int postId) {
        return postDAO.unlike( new IdExtractor(token).getAuthenticatedUserId(), postId);
    }


}

