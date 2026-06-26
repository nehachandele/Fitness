package com.project.fitness.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.project.fitness.dto.GoalRequest;
import com.project.fitness.dto.GoalResponse;
import com.project.fitness.model.Goal;
import com.project.fitness.repository.GoalRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GoalService {

    private final GoalRepository goalRepository;

    public GoalResponse createGoal(
            GoalRequest request) {

        Goal goal = Goal.builder()
                .userId(request.getUserId())
                .title(request.getTitle())
                .targetValue(request.getTargetValue())
                .currentValue(0)
                .completed(false)
                .type(request.getType())
                .deadline(request.getDeadline())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        goalRepository.save(goal);

        return mapToResponse(goal);
    }

    public List<GoalResponse> getUserGoals(
            String userId) {

        return goalRepository
                .findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public GoalResponse updateProgress(
            Long goalId,
            Integer progress) {

        Goal goal =
                goalRepository.findById(goalId)
                        .orElseThrow();

        goal.setCurrentValue(progress);

        if (goal.getCurrentValue()
                >= goal.getTargetValue()) {

            goal.setCompleted(true);
        }

        goal.setUpdatedAt(
                LocalDateTime.now());

        goalRepository.save(goal);

        return mapToResponse(goal);
    }

    private GoalResponse mapToResponse(
            Goal goal) {

        return new GoalResponse(
                goal.getId(),
                goal.getUserId(),
                goal.getTitle(),
                goal.getTargetValue(),
                goal.getCurrentValue(),
                goal.getType(),
                goal.getCompleted(),
                goal.getDeadline()
        );
    }
}