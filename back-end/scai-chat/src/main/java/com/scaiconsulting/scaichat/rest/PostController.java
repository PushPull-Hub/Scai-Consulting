package com.scaiconsulting.scaichat.rest;

import com.scaiconsulting.scaichat.entities.Post;
import com.scaiconsulting.scaichat.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api")
public class PostController {

    private PostService postService;

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

    @PostMapping("/posts")
    public Post createPost(@RequestBody Post post) {
        post.setId(0);
        return postService.createPost(post);
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
