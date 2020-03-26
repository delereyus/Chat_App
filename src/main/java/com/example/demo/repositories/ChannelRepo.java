package com.example.demo.repositories;

import com.example.demo.entities.Channel;
import com.example.demo.entities.UserChannel;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChannelRepo extends CrudRepository <Channel, Integer> {

    public Channel findById (int id);
    public List<Channel> findAllByAdminId(int adminId);
    public Channel findByNameIgnoreCase(String name);

    //Moved query from UserChannelRepo here. Since we need channel list of a user.
    //PS: nativeQuery lets me write query as it is in database.
    //Otherwise I'd need to use class names, and their field variable names instead.
    @Query(value = "SELECT channels.id, channels.name, channels.admin_id FROM" +
            " channels, users_channels WHERE" +
            " channel_id = channels.id " +
            "AND user_id = ?1", nativeQuery = true)
    public List<Channel> findAllByUserId(int userId);

}
