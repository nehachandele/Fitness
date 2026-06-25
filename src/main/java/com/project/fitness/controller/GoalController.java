package com.project.fitness.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.fitness.dto.GoalRequest;
import com.project.fitness.model.Goal;
import com.project.fitness.service.GoalService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/goals")
@RequiredArgsConstructor
public class GoalController {

    private final GoalService goalService;

    @PostMapping
    public ResponseEntity<Goal> createGoal(
            @RequestBody GoalRequest request) {

        return ResponseEntity.ok(
                goalService.createGoal(request));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Goal>> getUserGoals(
            @PathVariable String userId) {

        return ResponseEntity.ok(
                goalService.getUserGoals(userId));
    }

    @PutMapping("/{goalId}")
    public ResponseEntity<Goal> updateGoal(
            @PathVariable String goalId,
            @RequestParam Integer currentValue) {

        return ResponseEntity.ok(
                goalService.updateGoalProgress(
                        goalId,
                        currentValue));
    }

    @DeleteMapping("/{goalId}")
    public ResponseEntity<Void> deleteGoal(
            @PathVariable String goalId) {

        goalService.deleteGoal(goalId);

        return ResponseEntity.noContent()
                .build();
    }
}