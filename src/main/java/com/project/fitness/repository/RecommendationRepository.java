package com.project.fitness.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.fitness.model.Recommendation;

public interface RecommendationRepository extends JpaRepository<Recommendation, String> {

    List<Recommendation> findByUserId(String userId);

    List<Recommendation> findByActivityId(String activityId);

}
