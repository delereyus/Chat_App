package com.example.demo.controllers;

import com.example.demo.entities.Channel;
import com.example.demo.entities.UserChannel;
import com.example.demo.services.UserChannelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest")
public class UserChannelController {

    @Autowired
    private UserChannelService userChannelService;

    @GetMapping("/users/channels/id/{id}")
    public List<Channel> getUserChannels(@PathVariable int id){
        return userChannelService.findAllUserChannels(id);
    }

    @GetMapping("users/channels")
    public List<UserChannel> getAllUserChannels() {
        return userChannelService.findAll();
    }

    @PostMapping("/userChannels")
    public UserChannel addUserToChannel(@RequestBody UserChannel userChannel) { return userChannelService.addUserToChannel(userChannel); }

    @DeleteMapping("/userChannels")
    public void deleteUserChannel(@RequestBody UserChannel userChannel) {
        userChannelService.deleteUserChannel(userChannel);
    }
}
