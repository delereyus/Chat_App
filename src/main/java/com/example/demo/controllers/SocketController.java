package com.example.demo.controllers;

import com.example.demo.entities.Socket;
import com.example.demo.services.SocketService;
import com.google.gson.Gson;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Map;

@Controller
public class SocketController extends TextWebSocketHandler {

    // gives us the "same" functions as JSON.stringify/parse
    Gson gson = new Gson();

    // NOTE: Can not use @Autowired here due to WebSocketConfig instantiating the SocketController
    private SocketService socketService;

    /**
     * Vi kan bara använda @Autowired på denna service en gång,
     * så vi måste själva skapa en setter som låter Spring injecta
     * SocketService i denna controller.
     *
     * (Detta gör @Autowired under ytan)
     */
    public void setSocketService(SocketService socketService) {
        this.socketService = socketService;
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage textMessage) throws IOException {
        System.out.println("Received msg: " + textMessage.getPayload());

        // same as JSON.parse
        Socket socket = gson.fromJson(textMessage.getPayload(), Socket.class);
        System.out.println("Action: " + socket.getAction());
        System.out.println("Message: " + socket.getMessage());
        System.out.println("Timestamp: " + socket.getTimestamp());

        socketService.sendToAll(socket, Socket.class);

        // Demonstration purpose only: send back "Hello" + same message as received
//    socketService.sendToAll("Hello " + message.getPayload());

        // Example with a generic Map instead of converting the JSON to a specific class
        // Map keysAndValues = new Gson().fromJson(message.getPayload(), Map.class);
        // Get the value of a key named "firstname"
        // String firstname = keysAndValues.get("firstname");
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        socketService.addSession(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        socketService.removeSession(session);
    }
}