package com.scaiconsulting.scaichat.DTOs;

import java.util.ArrayList;

public class Chats {

    ArrayList<Chat> myChats;

    public Chats() {
    }

    public Chats(ArrayList<Chat> myChats) {
        this.myChats = myChats;
    }

    public ArrayList<Chat> getMyChats() {
        return myChats;
    }

    public void setMyChats(ArrayList<Chat> myChats) {
        this.myChats = myChats;
    }
}
