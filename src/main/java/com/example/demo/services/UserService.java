package com.example.demo.services;


import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepo userRepo;

    @Autowired
    SocketService socketService;

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
}
