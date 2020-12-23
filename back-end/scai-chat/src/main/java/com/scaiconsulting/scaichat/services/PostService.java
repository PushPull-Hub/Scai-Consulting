package com.scaiconsulting.scaichat.services;

import com.scaiconsulting.scaichat.entities.Post;
import com.scaiconsulting.scaichat.entities.PostComment;
import com.scaiconsulting.scaichat.entities.PostLike;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Set;

public interface PostService {

    Post createPost(Post post);

    List<Post> getPosts(int profileId);

    Post getPost(int postId);

    Post updatePost(Post post);

    void deletePost(int postId);

    PostComment commentOnPost(PostComment comment);

    List<PostComment> getPostComments(int postId);

    Set<PostLike> likePost(String token, int postId);

    Set<PostLike> unlikePost(String token, int postId);

    List<Post> getFriendsPosts(String token);


    List<Post> getProfilePosts(int friendId);

}
