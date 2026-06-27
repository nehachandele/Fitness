package com.project.fitness.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private String id;
  private String firstName;
  private String lastName;  
  private String email;
  private String password;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
  private Integer age;

private Double height;

private Double weight;

private String gender;

private String fitnessGoal;

private String experienceLevel;

private String activityLevel;

private String dietPreference;
}
