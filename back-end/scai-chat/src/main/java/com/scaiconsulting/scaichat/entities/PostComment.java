package com.scaiconsulting.scaichat.entities;

import javax.persistence.*;

@Entity
@Table(name = "post_comment")
public class PostComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "created_time")
    private String createdTime;

    @Column(name = "comment")
    private String comment;

    @Column(name = "post_id")
    private int postId;

    @Column(name = "user_id")
    private int userId;

    public PostComment() {

    }

    public PostComment(String createdTime, String comment, int postId, int userId) {
        this.createdTime = createdTime;
        this.comment = comment;
        this.postId = postId;
        this.userId = userId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(String createdTime) {
        this.createdTime = createdTime;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
