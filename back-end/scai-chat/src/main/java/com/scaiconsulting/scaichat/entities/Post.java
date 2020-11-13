package com.scaiconsulting.scaichat.entities;

import javax.persistence.*;

@Entity
@Table(name = "post")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "created_time")
    private String createdTime;

    @Column(name = "description")
    private String description;

    @Column(name = "object_id")
    private String objectId;

    @Column(name = "place")
    private String place;

    @Column(name = "can_comment")
    private boolean canComment;

    @Column(name = "can_share")
    private boolean canShare;

    @Column(name = "is_public")
    private boolean isPublic;

    @Column(name = "profile_id")
    private int profileId ;


    public Post() {

    }

    public Post(String createdTime, String description, String objectId, String place, boolean canComment, boolean canShare, boolean isPublic, int profileId) {
        this.createdTime = createdTime;
        this.description = description;
        this.objectId = objectId;
        this.place = place;
        this.canComment = canComment;
        this.canShare = canShare;
        this.isPublic = isPublic;
        this.profileId = profileId;
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

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public boolean getCanComment() {
        return canComment;
    }

    public void setCanComment(boolean canComment) {
        this.canComment = canComment;
    }

    public boolean getCanShare() {
        return canShare;
    }

    public void setCanShare(boolean canShare) {
        this.canShare = canShare;
    }

    public boolean getIsPublic() {
        return isPublic;
    }

    public void setIsPublic(boolean aPublic) {
        isPublic = aPublic;
    }

    public int getProfileId() {
        return profileId;
    }

    public void setProfileId(int profileId) {
        this.profileId = profileId;
    }
}
