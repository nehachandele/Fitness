package com.project.fitness.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.project.fitness.model.Activity;
import com.project.fitness.model.User;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecommendationRequest {
   
    
    private String userId;
    private String  activityId;
    private List<String> improvements;
    private List<String> suggestions;
    private List<String> safety;
  
}
