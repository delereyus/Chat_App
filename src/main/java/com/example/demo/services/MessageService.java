package com.example.demo.services;

import com.example.demo.entities.DeleteClass;
import com.example.demo.entities.Message;
import com.example.demo.repositories.MessageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MessageService {

    @Autowired
    MessageRepo messageRepo;

    @Autowired
    private SocketService socketService;

    public List<Message> findAllMessages(){
        return (List<Message>) messageRepo.findAll();
    }

    public Message postMessage(Message message){
        Message dbMessage = null;

        try{
            dbMessage = messageRepo.save(message);

            dbMessage.action = "new-message";

            socketService.sendToAll(dbMessage, Message.class);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return dbMessage;
    }

    public void deleteById(int id, int index){

        DeleteClass deleteClass = new DeleteClass();

        try {
            deleteClass.setIndex(index);
            deleteClass.setAction("delete-message");

            messageRepo.deleteById(id);

            socketService.sendToAll(deleteClass, DeleteClass.class);
        } catch(Exception e){
            e.printStackTrace();
        }
    }
}
