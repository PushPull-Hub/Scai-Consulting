package com.scaiconsulting.scaichat.servicesImplemetations;

import com.scaiconsulting.scaichat.DAOs.PostDAO;
import com.scaiconsulting.scaichat.DAOs.UserDAO;
import com.scaiconsulting.scaichat.entities.Post;
import com.scaiconsulting.scaichat.entities.Profile;
import com.scaiconsulting.scaichat.services.PostService;
import org.hibernate.type.AnyType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class PostServiceImplementation implements PostService {

    private PostDAO postDAO;
    private UserDAO userDAO;

    @Autowired
    public PostServiceImplementation(PostDAO postDAO, UserDAO userDAO) {
        this.postDAO = postDAO;
        this.userDAO = userDAO;
    }

    @Override
    @Transactional
    public Profile createPost(Profile profile, Post post) {
        profile.addPost(post);
        userDAO.updateProfile(profile);
        return profile;
    }

    @Override
    public List<Post> getPosts(int profileId) {
        return postDAO.getPosts(profileId);
    }

    @Override
    public Post getPost(int postId) {
        return postDAO.getPost(postId);
    }

    @Override
    public <T> Post updatePost(Post post ) {
        return postDAO.updatePost(post);
    }


}

