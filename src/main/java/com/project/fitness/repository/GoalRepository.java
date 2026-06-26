package com.project.fitness.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.fitness.model.Goal;

public interface GoalRepository
        extends JpaRepository<Goal, Long> {

    List<Goal> findByUserId(String userId);

    List<Goal> findByUserIdAndCompletedFalse(String userId);

}