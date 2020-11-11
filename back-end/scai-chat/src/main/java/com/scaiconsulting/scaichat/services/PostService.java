package com.scaiconsulting.scaichat.services;

import com.scaiconsulting.scaichat.entities.Post;
import com.scaiconsulting.scaichat.entities.Profile;
import org.hibernate.type.AnyType;

import java.util.List;

public interface PostService {

    public Profile createPost(Profile profile , Post post );

    public List<Post> getPosts(int profileId);

    public Post getPost(int postId);

    public <T> Post  updatePost(Post post);
}
