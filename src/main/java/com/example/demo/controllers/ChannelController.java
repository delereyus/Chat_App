package com.example.demo.controllers;

import com.example.demo.entities.Channel;
import com.example.demo.services.ChannelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest")
public class ChannelController {

    @Autowired
    ChannelService channelService;

    @GetMapping("/channels")
    public List<Channel> getAllChannels(){
        return channelService.findAllChannels();
    }

    @GetMapping("/channels/{id}")
    public Channel getOneChannel(@PathVariable int id){
        return channelService.findOneChannel(id);
    }

    @GetMapping("/channels/adminId/{adminId}")
    public List<Channel> getAllByAdminId(@PathVariable int adminId){
        return channelService.findAllByAdminId(adminId);
    }

    @GetMapping("/channels/channelName/{name}")
    public Channel getByName(@PathVariable String name){
        return channelService.findByNameIgnoreCase(name);
    }

    @PostMapping("/channels")
    public Channel createNewChannel(@RequestBody Channel newChannel){
        return channelService.createNewChannel(newChannel);
    }
}
