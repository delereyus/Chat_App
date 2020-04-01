package com.example.demo.entities;


import javax.persistence.*;

@Entity
@Table(name="friends_list")
public class FriendList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int user;
    private long time;

    @Transient
    public String action;

    public FriendList() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUser() {
        return user;
    }

    public void setUser(int user1) {
        this.user = user1;
    }

    public long getTime() {
        return time;
    }

    public void setTime(long time) {
        this.time = time;
    }
}
