package com.example.demo.controllers;

import com.example.demo.entities.ServerMessage;
import com.example.demo.services.ServerMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest")
public class ServerMessageController {

    @Autowired
    ServerMessageService serverMessageService;

    @GetMapping("/serverMessages")
    public List<ServerMessage> getAllServerMessages(){
        return serverMessageService.findAllServerMessages();
    }

    @PostMapping("/serverMessages")
    public ServerMessage printNewServerMessage(@RequestBody ServerMessage serverMessage){
        return serverMessageService.printNewMessage(serverMessage);
    }
}
