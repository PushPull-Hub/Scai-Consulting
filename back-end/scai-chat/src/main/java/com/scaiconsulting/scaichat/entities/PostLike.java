package com.scaiconsulting.scaichat.entities;

import javax.persistence.*;

@Entity
@Table(name = "post_like")
public class PostLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "likers_ids")
    private int likersIds;

    @Column(name = "post_id")
    private int postId;


    public PostLike() {
    }

    public PostLike(int likersIds, int postId) {
        this.likersIds = likersIds;
        this.postId = postId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getLikersIds() {
        return likersIds;
    }

    public void setLikersIds(int likersIds) {
        this.likersIds = likersIds;
    }

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }
}
