package com.scaiconsulting.scaichat.DTOs;

import com.scaiconsulting.scaichat.entities.Message;

import java.util.ArrayList;

public class Chat {
    private int id;
    private int myId;
    private MiniUserProfile secondUser;
    private int isLastMessageSeen;
    private Message lastMessage;
    ArrayList<Message> messages;


    public Chat() {
    }

    public Chat(int id, int myId, MiniUserProfile secondUser, int isLastMessageSeen, Message lastMessage) {
        this.id = id;
        this.myId = myId;
        this.secondUser = secondUser;
        this.isLastMessageSeen = isLastMessageSeen;
        this.lastMessage = lastMessage;
    }

    public Chat(int id, int myId, MiniUserProfile secondUser, int isLastMessageSeen, Message lastMessage, ArrayList<Message> messages) {
        this.id = id;
        this.myId = myId;
        this.secondUser = secondUser;
        this.isLastMessageSeen = isLastMessageSeen;
        this.lastMessage = lastMessage;
        this.messages = messages;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getMyId() {
        return myId;
    }

    public void setMyId(int myId) {
        this.myId = myId;
    }

    public MiniUserProfile getSecondUser() {
        return secondUser;
    }

    public void setSecondUser(MiniUserProfile secondUser) {
        this.secondUser = secondUser;
    }

    public int getIsLastMessageSeen() {
        return isLastMessageSeen;
    }

    public void setIsLastMessageSeen(int isLastMessageSeen) {
        this.isLastMessageSeen = isLastMessageSeen;
    }

    public Message getLastMessage() {
        return lastMessage;
    }

    public void setLastMessage(Message lastMessage) {
        this.lastMessage = lastMessage;
    }

    public ArrayList<Message> getMessages() {
        return messages;
    }

    public void setMessages(ArrayList<Message> messages) {
        this.messages = messages;
    }
}
