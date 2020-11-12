package com.scaiconsulting.scaichat.DAOs;

import com.scaiconsulting.scaichat.entities.Post;
import com.scaiconsulting.scaichat.entities.PostComment;

import java.util.List;

public interface PostDAO {

    public Post createPost(Post post);

    public List<Post> getPosts(int profileId);

    public Post getPost(int postId);

    public Post updatePost(Post post);

    public void deletePost(int postId);

    public List<Post> getFriendsPosts();

    public PostComment commentOnPost (PostComment comment) ;

    public List<PostComment> getPostComments(int postId) ;

}
