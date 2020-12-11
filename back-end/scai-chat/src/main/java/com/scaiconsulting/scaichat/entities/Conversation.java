package com.scaiconsulting.scaichat.entities;

import javax.persistence.*;

@Entity
@Table(name = "conversation")
public class Conversation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "first_user_id")
    private int firstUserId;

    @Column(name = "second_user_id")
    private int secondUserId;

    @Column(name = "is_last_message_seen")
    private int isLastMessageSeen;


    public Conversation() {
    }

    public Conversation(int firstUserId, int secondUserId, int isLastMessageSeen) {
        this.firstUserId = firstUserId;
        this.secondUserId = secondUserId;
        this.isLastMessageSeen = isLastMessageSeen;
    }

    public Conversation(int id, int firstUserId, int secondUserId, int isLastMessageSeen) {
        this.id = id;
        this.firstUserId = firstUserId;
        this.secondUserId = secondUserId;
        this.isLastMessageSeen = isLastMessageSeen;
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

    public int getIsLastMessageSeen() {
        return isLastMessageSeen;
    }

    public void setIsLastMessageSeen(int isLastMessageSeen) {
        this.isLastMessageSeen = isLastMessageSeen;
    }
}
