package com.project.fitness.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.project.fitness.dto.GoalRequest;
import com.project.fitness.model.Goal;
import com.project.fitness.model.GoalStatus;
import com.project.fitness.repository.GoalRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GoalService {
    private final  GoalRepository goalRepository;
    public Goal createGoal(GoalRequest  request){
         Goal goal = new Goal();

        goal.setUserId(request.getUserId());

        goal.setGoalType(
                request.getGoalType());

        goal.setTargetValue(
                request.getTargetValue());

        goal.setCurrentValue(0);

        goal.setStatus(
                GoalStatus.IN_PROGRESS);

        goal.setCreatedAt(
                LocalDateTime.now());

        goal.setUpdatedAt(
                LocalDateTime.now());
        return goalRepository.save(goal);
    }
     public List<Goal> getUserGoals(
            String userId) {

        return goalRepository.findByUserId(
                userId);
    }
 public Goal updateGoalProgress(
            String goalId,
            Integer currentValue) {

        Goal goal =
                goalRepository.findById(goalId)
                        .orElseThrow();

        goal.setCurrentValue(
                currentValue);

        if (currentValue >=
                goal.getTargetValue()) {

            goal.setStatus(
                    GoalStatus.COMPLETED);
        }

        goal.setUpdatedAt(
                LocalDateTime.now());

        return goalRepository.save(goal);
    }

    public void deleteGoal(
            String goalId) {

        goalRepository.deleteById(
                goalId);
    }
}