package com.example.demo.services;


import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepo userRepo;

    @Autowired
    SocketService socketService;

    public Optional<User> findCurrentUser() {
        // the login session is stored between page reloads,
        // and we can access the current authenticated user with this
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepo.findByUsername(username);
    }

    public List<User> findAllUsers() {
        return (List<User>) userRepo.findAll();
    }

    public User findOneUser (int id) {
        User user = userRepo.findById(id);
        if (user == null) return null;

        return user;
    }

    public User setUserToOnline(User user) {

        User userToLogin = null;

        try{
            userToLogin = userRepo.checkPassword(user.getUsername(), user.getPassword());
            userToLogin.action = "goOnline";
            userToLogin.setOnline(true);                           // Måste sättas till false när du loggar ut
            userRepo.save(userToLogin);                            // Måste ha med denna även i utloggningen
            socketService.sendToAll(userToLogin, User.class);      // Uppdaterar alla som ör online att "jag" precis gått online
        } catch(Exception e){
            e.printStackTrace();
        }

        return userToLogin;
    }

    /*public User checkLogin(String username, String password){
        return userRepo.checkPassword(username, password);
    }*/

    public User logOut(User user){

        User userToLogout = null;

        try{
            userToLogout = userRepo.findById(user.getId());
            userToLogout.action = "goOffline";
            userToLogout.setOnline(false);
            userToLogout.setLogoff_time(user.getLogoff_time());
            userRepo.save(userToLogout);
            socketService.sendToAll(userToLogout, User.class);
        } catch (Exception e){
            e.printStackTrace();
        }

        return userToLogout;

    }
    public User register(User newUser) {
        return userRepo.save(newUser);
    }

    public User updateUser(User user){
        User userToUpdate = null;
        try{
            userToUpdate = userRepo.findById(user.getId());
            userToUpdate.setPicture_url(user.getPicture_url());
            userToUpdate = userRepo.save(userToUpdate);
            userToUpdate.action = "update picture";
            socketService.sendToAll(userToUpdate, User.class);
        }catch(Exception e){
            e.printStackTrace();
        }
        return userToUpdate;
    }

}

