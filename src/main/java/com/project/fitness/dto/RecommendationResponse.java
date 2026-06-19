package com.project.fitness.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.project.fitness.model.Activity;
import com.project.fitness.model.User;

public class RecommendationResponse {
       
    private String id;

  
    private String userId;

   
    private Activity activity;

    private String type;

   
    private String recommendation;
    
   
    private List<String> improvements;

    private List<String> suggestions;

    
    private List<String> safety;
    private LocalDateTime createdAt;
    private LocalDateTime updateAt;

}
