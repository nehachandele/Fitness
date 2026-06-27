package com.project.fitness.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileResponse {

    private String id;

    private String firstName;

    private String lastName;

    private String email;

    private Integer age;

    private Double height;

    private Double weight;

    private String gender;

    private String fitnessGoal;

    private String experienceLevel;

    private Double bmi;
    private String activityLevel;

private String dietPreference;

}