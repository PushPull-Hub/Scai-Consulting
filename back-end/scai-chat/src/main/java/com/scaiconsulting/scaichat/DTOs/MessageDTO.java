package com.scaiconsulting.scaichat.DTOs;

public class MessageDTO {

    private int senderId;

    private int receiverId;

    private String text;

    private int conversionId;


    public MessageDTO() {
    }

    public MessageDTO(int senderId, int receiverId, String text, int conversionId) {
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.text = text;
        this.conversionId = conversionId;
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

    public int getConversionId() {
        return conversionId;
    }

    public void setConversionId(int conversionId) {
        this.conversionId = conversionId;
    }
}
