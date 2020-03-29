package com.example.demo.entities;

import javax.persistence.*;

@Entity
@Table(name = "channels")
public class Channel {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)

    private int id;
    private String name;
    private int adminid;

    @Transient
    public String action;

    public Channel() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAdminid() {
        return adminid;
    }

    public void setAdminid(int adminid) {
        this.adminid = adminid;
    }
}
