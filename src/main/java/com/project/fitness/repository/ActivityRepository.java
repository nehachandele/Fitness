package com.project.fitness.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.fitness.model.Activity;

import java.util.*;
public interface ActivityRepository extends JpaRepository<Activity, String> {

    List<Activity> findByUserId(String userId);

}
