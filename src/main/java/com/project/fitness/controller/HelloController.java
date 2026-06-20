package com.project.fitness.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController


public class HelloController {

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
}
