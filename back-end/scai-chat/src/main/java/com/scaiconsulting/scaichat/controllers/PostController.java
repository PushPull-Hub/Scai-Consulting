package com.scaiconsulting.scaichat.controllers;

import com.scaiconsulting.scaichat.configurations.IdExtractor;
import com.scaiconsulting.scaichat.entities.Post;
import com.scaiconsulting.scaichat.entities.PostComment;
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
    public Post createPost(@RequestHeader("Authentication") String token,  @RequestBody Post post) {
        post.setId(0);
        post.setUserId(new IdExtractor(token).getAuthenticatedUserId());
        return postService.createPost(post);
    }

    @PostMapping("/posts/{postId}")                        //  works fine
    public PostComment commentOnPost(@RequestBody PostComment comment, @PathVariable int postId) {
        comment.setId(0);
        comment.setPostId(postId);
        return postService.commentOnPost(comment) ;
    }

    @PutMapping("/posts")                                 //  works fine
    public Post updatePost(@RequestHeader("Authentication") String token,@RequestBody Post post) {
        post.setUserId(new IdExtractor(token).getAuthenticatedUserId());
        return postService.updatePost(post);
    }

    @DeleteMapping("/posts/{postId}")                      //  works fine
    public void deletePost(@PathVariable int postId) {
        postService.deletePost(postId);
    }


}
