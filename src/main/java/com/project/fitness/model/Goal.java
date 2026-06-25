package com.project.fitness.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Goal {

    @Id
    private String id;

    private String userId;

    private String title;

    private Integer targetValue;

    private Integer currentValue;

    private GoalType type;

    private Boolean completed;

    private LocalDateTime deadline;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}