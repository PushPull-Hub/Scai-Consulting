package com.scaiconsulting.scaichat.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "message")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "created_time")
    private Date createdTime;

    @Column(name = "sender_id")
    private int senderId;

    @Column(name = "receiver_id")
    private int receiverId;

    @Column(name = "text")
    private String text;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "conversation_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Conversation conversation;

    public Message() {
    }

    public Message(Date createdTime, int senderId, int receiverId, String text, Conversation conversation) {
        this.createdTime = createdTime;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.text = text;
        this.conversation = conversation;
    }

    public Message(int id, Date createdTime, int senderId, int receiverId, String text, Conversation conversation) {
        this.id = id;
        this.createdTime = createdTime;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.text = text;
        this.conversation = conversation;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date   getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Date createdTime) {
        this.createdTime = createdTime;
    }

    public int getSenderId() {
        return senderId;
    }

    public void setSenderId(int senderId) {
        this.senderId = senderId;
    }

    public int getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(int receiverId) {
        this.receiverId = receiverId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Conversation getConversation() {
        return conversation;
    }

    public void setConversation(Conversation conversation) {
        this.conversation = conversation;
    }
}
