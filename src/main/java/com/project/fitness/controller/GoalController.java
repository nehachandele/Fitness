package com.project.fitness.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.fitness.dto.GoalRequest;
import com.project.fitness.dto.GoalResponse;
import com.project.fitness.service.GoalService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/goals")
@RequiredArgsConstructor
public class GoalController {

    private final GoalService goalService;

    @PostMapping
    public ResponseEntity<GoalResponse>
    createGoal(
            @RequestBody GoalRequest request) {

        return ResponseEntity.ok(
                goalService.createGoal(request));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<GoalResponse>>
    getGoals(
            @PathVariable String userId) {

        return ResponseEntity.ok(
                goalService.getUserGoals(userId));
    }

    @PutMapping("/{goalId}/{progress}")
    public ResponseEntity<GoalResponse>
    updateGoalProgress(
            @PathVariable String goalId,
            @PathVariable Integer progress) {

        return ResponseEntity.ok(
                goalService.updateProgress(
                        goalId,
                        progress));
    }
}