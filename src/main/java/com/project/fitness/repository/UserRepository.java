package com.project.fitness.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.fitness.model.User;

public interface UserRepository extends JpaRepository<User, String> {

}
