package com.scaiconsulting.scaichat.entities;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "conversation")
public class Conversation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "first_user")
    private int  firstUserId;

    @Column(name = "second_user")
    private int secondUserId;

    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            mappedBy = "message")
    private Set<Message> messages = new HashSet<>();

    public Conversation() {
    }

    public Conversation(int firstUserId, int secondUserId, Set<Message> messages) {
        this.firstUserId = firstUserId;
        this.secondUserId = secondUserId;
        this.messages = messages;
    }

    public Conversation(int id, int firstUserId, int secondUserId, Set<Message> messages) {
        this.id = id;
        this.firstUserId = firstUserId;
        this.secondUserId = secondUserId;
        this.messages = messages;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getFirstUserId() {
        return firstUserId;
    }

    public void setFirstUserId(int firstUserId) {
        this.firstUserId = firstUserId;
    }

    public int getSecondUserId() {
        return secondUserId;
    }

    public void setSecondUserId(int secondUserId) {
        this.secondUserId = secondUserId;
    }

    public Set<Message> getMessages() {
        return messages;
    }

    public void setMessages(Set<Message> messages) {
        this.messages = messages;
    }
}
