package com.scaiconsulting.scaichat.entities;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

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
    private String objectId;

    @Column(name = "location")
    private String location;

    @Column(name = "can_comment")
    private boolean commentable;

    @Column(name = "can_share")
    private boolean shareable;

    @Column(name = "is_public")
    private boolean pubblico;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "image_url")
    private String imageUrl;

    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            mappedBy = "post")
    private Set<PostComment> comments = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "post")
    private Set<PostLike> likersIds = new HashSet<>();

    public Post() {
    }

    public Post(String created_time,
                String description,
                String objectId,
                String location,
                boolean commentable,
                boolean shareable,
                boolean pubblico,
                int userId,
                String imageUrl,
                Set<PostComment> comments,
                Set<PostLike> likersIds) {
        this.created_time = created_time;
        this.description = description;
        this.objectId = objectId;
        this.location = location;
        this.commentable = commentable;
        this.shareable = shareable;
        this.pubblico = pubblico;
        this.userId = userId;
        this.imageUrl = imageUrl;
        this.comments = comments;
        this.likersIds = likersIds;
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

    public String getObjectId() {
        return objectId;
    }

    public void setObjectId(String objectId) {
        this.objectId = objectId;
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

    public Set<PostComment> getComments() {
        return comments;
    }

    public void setComments(Set<PostComment> comments) {
        this.comments = comments;
    }


    public Set<PostLike> getLikersIds() {
        return likersIds;
    }

    public void setLikersIds(Set<PostLike> likersIds) {
        this.likersIds = likersIds;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
