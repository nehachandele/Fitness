package com.project.fitness.dto;

import java.time.LocalDateTime;

import com.project.fitness.model.GoalType;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GoalResponse {

    private Long id;

    private String userId;

    private String title;

    private Integer targetValue;

    private Integer currentValue;

    private GoalType type;

    private Boolean completed;

    private LocalDateTime deadline;
}