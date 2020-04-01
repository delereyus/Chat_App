package com.example.demo.entities;

import com.example.demo.services.UserChannelsId;
import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "users_channels")
@IdClass(UserChannelsId.class)
public class UserChannel implements Serializable {

    @Id
    private int channel_id;
    @Id
    private int user_id;

    @Transient
    public String action;

    public UserChannel() {
    }

    public UserChannel(int cid, int uid){
        this.channel_id = cid;
        this.user_id = uid;
    }

    public int getChannel_id() {
        return channel_id;
    }

    public void setChannel_id(int channel_id) {
        this.channel_id = channel_id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }
}
