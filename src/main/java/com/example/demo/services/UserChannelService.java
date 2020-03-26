package com.example.demo.services;

import com.example.demo.entities.Channel;
import com.example.demo.entities.UserChannel;
import com.example.demo.repositories.ChannelRepo;
import com.example.demo.repositories.UserChannelRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserChannelService {
    @Autowired
    private ChannelRepo channelRepo;
    @Autowired
    private UserChannelRepo userChannelRepo;

    public List<Channel> findAllUserChannels(int id){
        return channelRepo.findAllByUserId(id);
    }

    public UserChannel addUserToChannel(UserChannel userChannel){
        return userChannelRepo.save(userChannel);
    }

}
