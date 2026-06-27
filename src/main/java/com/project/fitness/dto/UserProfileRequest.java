package com.project.fitness.dto;

import lombok.Data;

@Data
public class UserProfileRequest {

    private Integer age;

    private Double height;

    private Double weight;

    private String gender;

    private String fitnessGoal;

    private String experienceLevel;

    private String activityLevel;

    private String dietPreference;
}