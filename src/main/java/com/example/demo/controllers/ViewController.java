package com.example.demo.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
//@RequestMapping("/")
public class ViewController {

    /*@GetMapping("/user")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public String userAccess() {
        return "User Content.";
    }

    @GetMapping("/mod")
    @PreAuthorize("hasRole('MODERATOR')")
    public String moderatorAccess() {
        return "Moderator Board.";
    }*/

    @GetMapping("/rest/auth/checkToken")
    @PreAuthorize("hasRole('ADMIN')")
    public String checkToken(){
        return "valid token";
    }

    /*@GetMapping("/home")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminAccess() {
        return "working";
    }*/
}
