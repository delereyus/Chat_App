package com.example.demo.controllers;

import com.example.demo.entities.User;
import com.example.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/rest")            // Går så att rest alltid finns med
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.findAllUsers();
    }

    @GetMapping("/users/{id}")
    public User getOneUser (@PathVariable int id) {
        return userService.findOneUser(id);
    }

    @PostMapping("/users/login")
    public User checkLogin (@RequestBody User user){
        return userService.setUserToOnline(user);

        //userService.setUserToOnline(userToLogin);

        //Gör post mapping, och request body ist för @PathVariable
        //Man skickar aldrig med lösenord till frontend  för säkerhetsskäl
    }

    @PutMapping("/users/logout")
    public User logOut(@RequestBody User user){
        return userService.logOut(user);
    }

    @PostMapping("/users")
    public User register(@RequestBody User user) {
        return userService.register(user);
    }



}
