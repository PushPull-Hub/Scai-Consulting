package com.scaiconsulting.scaichat.controllers;

import com.scaiconsulting.scaichat.configurations.IdExtractor;
import com.scaiconsulting.scaichat.entities.Post;
import com.scaiconsulting.scaichat.entities.PostComment;
import com.scaiconsulting.scaichat.entities.PostLike;
import com.scaiconsulting.scaichat.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", exposedHeaders = "Authentication")
@RequestMapping("/api")
public class PostController {

    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/posts")                        //works fine
    public List<Post> getPosts(@RequestHeader("Authentication") String token) {
        int userId = new IdExtractor(token).getAuthenticatedUserId();
        return postService.getPosts(userId);
    }

    @GetMapping("/posts/{postId}")                     // works fine
    public Post getPost(@PathVariable int postId) {
        return postService.getPost(postId);
    }

    @GetMapping("/posts/{postId}/comments")            //  works fine
    public List<PostComment> getPostComments(@PathVariable int postId) {
        return postService.getPostComments(postId);
    }

    @PostMapping("/posts")                                 //  works fine
    public Post createPost(@RequestHeader("Authentication") String token, @RequestBody Post post) {
        post.setId(0);
        post.setUserId(new IdExtractor(token).getAuthenticatedUserId());
        return postService.createPost(post);
    }

    @PutMapping("/posts")                                 //  works fine
    public Post updatePost(@RequestHeader("Authentication") String token, @RequestBody Post post) {
        post.setUserId(new IdExtractor(token).getAuthenticatedUserId());
        return postService.updatePost(post);
    }

    @DeleteMapping("/posts/{postId}")                      //  works fine
    public void deletePost(@PathVariable int postId) {
        postService.deletePost(postId);
    }


    @PostMapping("/posts/{postId}/comments")                        //  works fine
    public PostComment addComment(@RequestHeader("Authentication") String token,
                                  @RequestBody PostComment comment,
                                  @PathVariable int postId) {
        Post post = postService.getPost(postId);
        if (post != null) {
            comment.setPost(post);
            comment.setId(0);
            comment.setUserId(new IdExtractor(token).getAuthenticatedUserId());
        }
        return postService.commentOnPost(comment);
    }


    @PostMapping("/posts/like")
    public Set<PostLike> likePost(@RequestHeader("Authentication") String token,
                                  @RequestBody int postId) {
        return postService.likePost(token, postId);

    }

    @PostMapping("/posts/unlike")
    public Set<PostLike> unlikePost(@RequestHeader("Authentication") String token,
                                    @RequestBody int postId) {
        return postService.unlikePost(token, postId);
    }

    @GetMapping("/posts/friends")
    public List<Post> getFriendsPosts(@RequestHeader("Authentication") String token) {
        return this.postService.getFriendsPosts(token);
    }


    @PostMapping("/profile/posts")
    public List<Post> getProfilePosts(@RequestBody int friendId) {
        try {
            return this.postService.getProfilePosts(friendId);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
