package com.project.fitness.dto;

import java.time.LocalDateTime;

import com.project.fitness.model.GoalStatus;
import com.project.fitness.model.GoalType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GoalResponse {

    private String id;

    private String userId;

    private GoalType goalType;

    private Integer targetValue;

    private Integer currentValue;

    private GoalStatus status;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}