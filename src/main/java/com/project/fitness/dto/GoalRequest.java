package com.project.fitness.dto;

import com.project.fitness.model.GoalType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GoalRequest {

    private String userId;

    private GoalType goalType;

    private Integer targetValue;
}