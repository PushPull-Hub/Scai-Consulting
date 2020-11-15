package com.scaiconsulting.scaichat.entities;

import javax.persistence.*;

@Entity
@Table(name = "post")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "created_time")
    private String created_time;

    @Column(name = "description")
    private String description;

    @Column(name = "object_id")
    private String object_id ;

    @Column(name = "location")
    private String location;

    @Column(name = "can_comment")
    private boolean commentable;

    @Column(name = "can_share")
    private boolean shareable;

    @Column(name = "is_public")
    private boolean pubblico;

    @Column(name = "user_id")
    private int userId ;


    public Post() {
    }

    public Post(String created_time, String description, String object_id, String location, boolean commentable, boolean shareable, boolean pubblico, int userId) {
        this.created_time = created_time;
        this.description = description;
        this.object_id = object_id;
        this.location = location;
        this.commentable = commentable;
        this.shareable = shareable;
        this.pubblico = pubblico;
        this.userId = userId;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCreated_time() {
        return created_time;
    }

    public void setCreated_time(String created_time) {
        this.created_time = created_time;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getObject_id() {
        return object_id;
    }

    public void setObject_id(String object_id) {
        this.object_id = object_id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public boolean isCommentable() {
        return commentable;
    }

    public void setCommentable(boolean commentable) {
        this.commentable = commentable;
    }

    public boolean isShareable() {
        return shareable;
    }

    public void setShareable(boolean shareable) {
        this.shareable = shareable;
    }

    public boolean isPubblico() {
        return pubblico;
    }

    public void setPubblico(boolean pubblico) {
        this.pubblico = pubblico;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
