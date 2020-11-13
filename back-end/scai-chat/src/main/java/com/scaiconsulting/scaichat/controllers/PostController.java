package com.scaiconsulting.scaichat.controllers;

import com.scaiconsulting.scaichat.entities.Post;
import com.scaiconsulting.scaichat.entities.PostComment;
import com.scaiconsulting.scaichat.entities.Profile;
import com.scaiconsulting.scaichat.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api")
public class PostController {

    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/posts/{profileId}")
    public List<Post> getPosts(@PathVariable int profileId) {
        return postService.getPosts(profileId);
    }

    @GetMapping("/posts/post/{postId}")
    public Post getPost(@PathVariable int postId) {
        return postService.getPost(postId);
    }

    @GetMapping("/posts/post/{postId}/comments")
    public List<PostComment> getPostComments(@PathVariable int postId) {
        return postService.getPostComments(postId);
    }

    @PostMapping("/posts")
    public Post createPost(@RequestBody Post post) {
        post.setId(0);
        return postService.createPost(post);
    }

    @PostMapping("/posts/{postId}")
    public PostComment commentOnPost(@RequestBody PostComment comment, @PathVariable int postId) {
        comment.setId(0);
        Post post = new Post();
        post.setId(postId);
        comment.setPost(post);
        return postService.commentOnPost(comment) ;

    }

    @PutMapping("/posts")
    public Post updatePost(@RequestBody Post post) {
        return postService.updatePost(post);
    }

    @DeleteMapping("/posts/{postId}")
    public void deletePost(@PathVariable int postId) {
        postService.deletePost(postId);
    }


}
