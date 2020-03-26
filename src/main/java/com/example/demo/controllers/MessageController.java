package com.example.demo.controllers;

import com.example.demo.entities.Message;
import com.example.demo.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest")
public class MessageController {

    @Autowired
    MessageService messageService;

    @GetMapping("/messages")
    public List<Message> getAllMessages(){

        return messageService.findAllMessages();
    }
    @PostMapping("/messages")
    public Message postMessage(@RequestBody Message message){
        return messageService.postMessage(message);
    }

    @DeleteMapping("/messages/{id}/{index}")
    public void deleteMessage(@PathVariable int id, @PathVariable int index) { messageService.deleteById(id, index);}

}
