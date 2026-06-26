package com.project.fitness.service;

import java.util.List;

import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Service;

import com.project.fitness.dto.ActivityRequest;
import com.project.fitness.dto.ActivityResponse;
import com.project.fitness.model.Activity;
import com.project.fitness.model.User;
import com.project.fitness.repository.ActivityRepository;
import com.project.fitness.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ActivityService {
    private final ActivityRepository activityRepository;
    private final UserRepository userRepository;
      private final GoalService goalService;
    public ActivityResponse trackActivity(ActivityRequest request) {
        User user = userRepository.findById(request.getUserId()).orElseThrow(()-> new RuntimeException("User not found"));
        Activity activity=Activity.builder()
             .user(user)
            .type(request.getType())
            .duration(request.getDuration())
            .caloriesBurned(request.getCaloriesBurned())
            .startTime(request.getStartTime())
            .additionalMetrics(request.getAdditionalMetrics())

        .build();
    Activity  savedActivity  =activityRepository.save(activity);
    goalService.updateGoalAfterActivity(savedActivity);
    return mapToResponse(savedActivity);
       
    }
    private ActivityResponse mapToResponse(Activity savedActivity) {
 ActivityResponse response = new ActivityResponse();
 response.setId(savedActivity.getId());
    response.setUserId(savedActivity.getUser().getId());
    response.setType(savedActivity.getType());
    response.setDuration(savedActivity.getDuration());
        
    response.setCaloriesBurned(savedActivity.getCaloriesBurned());
    response.setStartTime(savedActivity.getStartTime());
    response.setAdditionalMetrics(savedActivity.getAdditionalMetrics());
       response.setCreatedAt(savedActivity.getCreatedAt());
    response.setUpdatedAt(savedActivity.getUpdatedAt());
    return response;

    }
    public List<ActivityResponse> getUserActivities(String userId) {
        List<Activity> activities=activityRepository.findByUserId(userId);
        return activities.stream().map(this::mapToResponse).toList();

    }
}
