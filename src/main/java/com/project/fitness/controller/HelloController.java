package com.project.fitness.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.fitness.security.JwtUtils;

@RestController


public class HelloController {
@Autowired
AuthenticationManager authenticationManager;

@Autowired
JwtUtils jwtutils;
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/hello")
    public String Hello(){
        return "Hello";
    }

    @GetMapping("/admin/hello")
    public String sayAdminHello(){
        return "Heelo, Admin";
    }
    @GetMapping("/user/hello")
    public String sayUserHello(){
        return "Heelo,User ";
    }

    @PostMapping("/signin")
    public String login(@RequestBody LoginRequest loginRequest){
        Authentication authentication;
        try {
            authentication=authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),loginRequest.getPassword())

            );
            
        } catch (AuthenticationException e) {
            e.printStackTrace();
            return "Could Not AUthenticate";
        }
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetails userDetails=(UserDetails) authentication.getPrincipal();
        String jwtToken= jwtutils.generateTokenFromUsername(userDetails.getUsername());
        return jwtToken;
    }
}
