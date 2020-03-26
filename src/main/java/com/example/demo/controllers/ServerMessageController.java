package com.example.demo.controllers;

import com.example.demo.services.ServerMessageService;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ServerMessageController {

    ServerMessageService serverMessageService;
}
