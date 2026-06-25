package com.project.fitness.dto;

import java.time.LocalDateTime;

import com.project.fitness.model.GoalType;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GoalRequest {

    private String userId;

    private String title;

    private Integer targetValue;

    private GoalType type;

    private LocalDateTime deadline;
}