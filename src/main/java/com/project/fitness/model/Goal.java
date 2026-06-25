package com.project.fitness.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Goal {
    @Id
    private String id;
    public String userId;
    private GoalType goalType;
    private Integer targetValue;
    private Integer currentValue;
    private GoalStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


}
