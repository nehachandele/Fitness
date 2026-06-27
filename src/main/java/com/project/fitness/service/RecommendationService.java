package com.project.fitness.service;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;
import com.project.fitness.dto.RecommendationRequest;
import com.project.fitness.model.Activity;
import com.project.fitness.model.Goal;
import com.project.fitness.model.Recommendation;
import com.project.fitness.model.User;
import com.project.fitness.repository.ActivityRepository;
import com.project.fitness.repository.GoalRepository;
import com.project.fitness.repository.RecommendationRepository;
import com.project.fitness.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecommendationService {

    private final RecommendationRepository recommendationRepository;
    private final UserRepository userRepository;
    private final ActivityRepository activityRepository;
    private final GeminiService geminiService;
private final GoalRepository goalRepository;
    public Recommendation generateRecommendation(RecommendationRequest request) {

    User user = userRepository.findById(request.getUserId())
            .orElseThrow(() ->
                    new RuntimeException("User Not Found"));

    Activity activity = activityRepository.findById(request.getActivityId())
            .orElseThrow(() ->
                    new RuntimeException("Activity Not Found"));

    List<Goal> goals =
            goalRepository.findByUserId(user.getId());

    StringBuilder goalSummary = new StringBuilder();

    if (goals.isEmpty()) {

        goalSummary.append("No active goals.");

    } else {

        for (Goal goal : goals) {

            goalSummary
                    .append("Goal: ")
                    .append(goal.getTitle())
                    .append("\n")
                    .append("Type: ")
                    .append(goal.getType())
                    .append("\n")
                    .append("Progress: ")
                    .append(goal.getCurrentValue())
                    .append("/")
                    .append(goal.getTargetValue())
                    .append("\n\n");
        }
    }

    String prompt = """
You are an expert certified fitness coach.

Analyze the following user's profile and workout.

================ USER PROFILE ================

Name:
%s %s

Age:
%d

Gender:
%s

Height:
%.1f cm

Weight:
%.1f kg

BMI:
%.2f

Fitness Goal:
%s

Experience Level:
%s

================ TODAY'S ACTIVITY ================

Activity:
%s

Duration:
%d minutes

Calories Burned:
%d

================ GOALS ================

%s

Return ONLY valid JSON.

{
  "recommendation":"...",
  "improvements":[
    "...",
    "...",
    "..."
  ],
  "suggestions":[
    "...",
    "...",
    "..."
  ],
  "safety":[
    "...",
    "...",
    "..."
  ]
}

Rules:
- Return JSON only.
- Do NOT use markdown.
- Do NOT explain anything.
- Give personalized advice based on profile, BMI, goals and activity.
""".formatted(

            user.getFirstName(),
            user.getLastName(),

            user.getAge() == null ? 0 : user.getAge(),

            user.getGender() == null ? "Unknown" : user.getGender(),

            user.getHeight() == null ? 0 : user.getHeight(),

            user.getWeight() == null ? 0 : user.getWeight(),

            user.getBMI(),

            user.getFitnessGoal() == null
                    ? "General Fitness"
                    : user.getFitnessGoal(),

            user.getExperienceLevel() == null
                    ? "Beginner"
                    : user.getExperienceLevel(),

            activity.getType(),

            activity.getDuration(),

            activity.getCaloriesBurned(),

            goalSummary.toString()

    );

    String aiResponse = geminiService.askGemini(prompt);

    System.out.println("========== GEMINI RESPONSE ==========");
    System.out.println(aiResponse);
    System.out.println("=====================================");

    try {

        Gson gson = new Gson();

        JsonObject json =
                JsonParser.parseString(aiResponse)
                        .getAsJsonObject();

        String recommendationText =
                json.get("recommendation")
                        .getAsString();

        Type listType =
                new TypeToken<List<String>>() {
                }.getType();

        List<String> improvements =
                json.has("improvements")
                        ? gson.fromJson(
                                json.get("improvements"),
                                listType)
                        : new ArrayList<>();

        List<String> suggestions =
                json.has("suggestions")
                        ? gson.fromJson(
                                json.get("suggestions"),
                                listType)
                        : new ArrayList<>();

        List<String> safety =
                json.has("safety")
                        ? gson.fromJson(
                                json.get("safety"),
                                listType)
                        : new ArrayList<>();

        Recommendation recommendation =
                Recommendation.builder()
                        .user(user)
                        .activity(activity)
                        .recommendation(recommendationText)
                        .improvements(improvements)
                        .suggestions(suggestions)
                        .safety(safety)
                        .build();

        return recommendationRepository.save(recommendation);

    } catch (Exception e) {

        e.printStackTrace();

        Recommendation recommendation =
                Recommendation.builder()
                        .user(user)
                        .activity(activity)
                        .recommendation(aiResponse)
                        .improvements(new ArrayList<>())
                        .suggestions(new ArrayList<>())
                        .safety(new ArrayList<>())
                        .build();

        return recommendationRepository.save(recommendation);
    }
}
    public List<Recommendation> getUserRecommendation(String userId) {
        return recommendationRepository.findByUserId(userId);
    }

    public List<Recommendation> getActivityRecommendation(String activityId) {
        return recommendationRepository.findByActivityId(activityId);
    }

}