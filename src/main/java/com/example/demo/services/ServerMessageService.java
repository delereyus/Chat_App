package com.example.demo.services;

import com.example.demo.entities.ServerMessage;
import com.example.demo.repositories.ServerMessageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServerMessageService {

    @Autowired
    ServerMessageRepo serverMessageRepo;
    @Autowired
    SocketService socketService;

    public List<ServerMessage> findAllServerMessages(){
        return (List<ServerMessage>)serverMessageRepo.findAll();
    }

    public ServerMessage printNewMessage(ServerMessage serverMessage){
        ServerMessage newMessage = null;

        try{
            newMessage = serverMessageRepo.save(serverMessage);

            newMessage.action = "new-server-message";

            socketService.sendToAll(newMessage, ServerMessage.class);
        } catch(Exception e){
            e.printStackTrace();
        }

        return newMessage;
    }
}
