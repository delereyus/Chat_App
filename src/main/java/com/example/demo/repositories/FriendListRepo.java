package com.example.demo.repositories;

import com.example.demo.entities.DeleteFriend;
import com.example.demo.entities.FriendList;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface FriendListRepo extends CrudRepository<FriendList, Integer> {

    //New query that checks both user1 and user2.
    //CASE WHEN user1 = :id THEN user2 ELSE user1 END AS user: Is a sort of if..else statement (or like switch case)
    // It checks which column required user is in and then returns the id of opposite column in same row.
    //@Params("id")int user1Id: lets us reuse same parameter in multiple query places
   @Query(value = "SELECT  id, time, CASE WHEN user1 = :id THEN user2 ELSE user1 END AS user\n" +
           "FROM friends_list\n" +
           "WHERE user1 = :id OR user2 = :id", nativeQuery = true)
    List<FriendList> findAllByUser1(@Param("id")int user1Id);
    /*@Query(value = "SELECT friends_list.*, username " +
            "FROM friends_list, users " +
            "WHERE user1 = ?1 " +
            "AND user2 = users.id", nativeQuery = true)
    List<FriendList> findAllByUser1(int user1Id);*/
    

    //deletes the row that contains both userIds passed by the params
    @Modifying
    @Transactional
    @Query(value = "DELETE " +
            "FROM friends_list " +
            "WHERE (user1 = :user1id OR user2 = :user1id) AND (user1 = :user2id OR user2 = :user2id)", nativeQuery = true)
    public void deleteOneByUser1(@Param("user1id")int user1Id, @Param("user2id") int user2Id);
}
