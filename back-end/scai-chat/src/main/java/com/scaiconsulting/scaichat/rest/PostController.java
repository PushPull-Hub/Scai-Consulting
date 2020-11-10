package com.scaiconsulting.scaichat.rest;


import com.scaiconsulting.scaichat.entities.Post;
import com.scaiconsulting.scaichat.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "http://localhost:8080")
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


}
