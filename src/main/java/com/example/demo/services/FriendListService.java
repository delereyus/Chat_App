package com.example.demo.services;


import com.example.demo.entities.DeleteFriend;
import com.example.demo.entities.FriendList;
import com.example.demo.entities.Friendship;
import com.example.demo.repositories.FriendListRepo;
import com.example.demo.repositories.FriendshipRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FriendListService {

    @Autowired
    FriendListRepo friendListRepo;
    @Autowired
    private SocketService socketService;
    @Autowired
    FriendshipRepo friendshipRepo;

    public List<FriendList> findAllByUser1(int user1id){
        return friendListRepo.findAllByUser1(user1id);
    }

    public void deleteOneByUser1(int user1Id, int user2Id){

        DeleteFriend deleteFriend = new DeleteFriend();

        deleteFriend.setUser1id(user1Id);
        deleteFriend.setUser2id(user2Id);
        try {
            friendListRepo.deleteOneByUser1(user1Id, user2Id);

            deleteFriend.action = "delete-friend";

            socketService.sendToAll(deleteFriend, DeleteFriend.class);
        } catch(Exception e){
            e.printStackTrace();
        }
    }

    public Friendship addFriend(Friendship friendship){

        Friendship newFriendShip = friendshipRepo.save(friendship);

        newFriendShip.action = "new-friendship";

        socketService.sendToAll(newFriendShip, Friendship.class);

        return newFriendShip;
    }
}
