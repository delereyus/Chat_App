package com.example.demo.controllers;

import com.example.demo.entities.DeleteFriend;
import com.example.demo.entities.FriendList;
import com.example.demo.entities.Friendship;
import com.example.demo.services.FriendListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest")

public class FriendListController {

    @Autowired
    FriendListService friendListService;

    @GetMapping("/friend-list/{userId}")
    public List<FriendList> getAllFriendsForUser(@PathVariable int userId) {
        return friendListService.findAllByUser1(userId);
    }

    @DeleteMapping("/friend-list/{user1Id}/{user2Id}")
    public void deleteOneByUser1(@PathVariable int user1Id, @PathVariable int user2Id) {
        friendListService.deleteOneByUser1(user1Id, user2Id);
    }

    @PostMapping("/friend-list")
    public Friendship addFriend(@RequestBody Friendship friendship) {
        return friendListService.addFriend(friendship);
    }
}

