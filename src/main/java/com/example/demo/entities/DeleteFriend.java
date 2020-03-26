package com.example.demo.entities;

public class DeleteFriend {

    private int user1id;
    private int user2id;
    public String action;

    public DeleteFriend(){}

    public int getUser1id() {
        return user1id;
    }

    public void setUser1id(int user1id) {
        this.user1id = user1id;
    }

    public int getUser2id() {
        return user2id;
    }

    public void setUser2id(int user2id) {
        this.user2id = user2id;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }
}
