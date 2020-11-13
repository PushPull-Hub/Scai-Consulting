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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id")
    private Profile profile ;

    public PostComment() {

    }

    public PostComment( String createdTime, String comment, Post post, Profile profile) {
        this.createdTime = createdTime;
        this.comment = comment;
        this.post = post;
        this.profile = profile;
    }

    public PostComment(String createdTime, String comment, Post post) {
        this.createdTime = createdTime;
        this.comment = comment;
        this.post = post;
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

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

     public Profile getProfile() {

        return profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }


}
