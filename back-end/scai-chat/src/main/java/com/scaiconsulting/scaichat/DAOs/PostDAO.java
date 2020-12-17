package com.scaiconsulting.scaichat.DAOs;

import com.scaiconsulting.scaichat.entities.Post;
import com.scaiconsulting.scaichat.entities.PostComment;
import com.scaiconsulting.scaichat.entities.PostLike;

import java.util.List;
import java.util.Set;

public interface PostDAO {

    Post createPost(Post post);

    List<Post> getPosts(int profileId);

    Post getPost(int postId);

    Post updatePost(Post post);

    void deletePost(int postId);

    List<Post> getFriendsPosts( List<Integer> friendsIds , int myId  );

    PostComment commentOnPost(PostComment comment);

    List<PostComment> getPostComments(int postId);

    Set<PostLike> likePost(int likerId, int postId);

    Set<PostLike>  unlike(int unlikerId, int postId) ;


}
