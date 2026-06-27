package com.project.fitness.service;

import java.time.Instant;
import java.time.ZoneOffset;
import java.util.List;
import com.project.fitness.dto.UserProfileRequest;
import com.project.fitness.dto.UserProfileResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.fitness.dto.LoginRequest;
import com.project.fitness.dto.RegisterRequest;
import com.project.fitness.dto.UserResponse;
import com.project.fitness.model.User;
import com.project.fitness.model.UserRole;
import com.project.fitness.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class UserService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  public UserResponse register(RegisterRequest request) {
    UserRole role=request.getRole()!=null? request.getRole():
    UserRole.USER;
    User user = User.builder()
        .email(request.getEmail())
        .firstName(request.getFirstName())
        .lastName(request.getLastName())
        .password(passwordEncoder.encode(request.getPassword()))
        .role(role)
        .build();
    // User user = new User(
    // null,
    // request.getFirstName(),
    // request.getEmail(),
    // request.getPassword(), // agar RegisterRequest me password hai
    // request.getLastName(),
    // Instant.now().atZone(ZoneOffset.UTC).toLocalDateTime(),
    // Instant.now().atZone(ZoneOffset.UTC).toLocalDateTime(),
    // List.of(),
    // List.of()
    // );
    User savedUser = userRepository.save(user);
    return mapToResponse(savedUser);
  }

  public UserResponse mapToResponse(User savedUser) {
    UserResponse response = new UserResponse();
    response.setId(savedUser.getId());
    response.setFirstName(savedUser.getFirstName());
    response.setLastName(savedUser.getLastName());
    response.setEmail(savedUser.getEmail());
    response.setCreatedAt(savedUser.getCreatedAt());
    response.setUpdatedAt(savedUser.getUpdatedAt());

    return response;
  }

  public User authenticate(LoginRequest loginRequest) {
  User user = userRepository.findByEmail(loginRequest.getEmail());
            if (user == null)
                throw new RuntimeException("Invalid Credentials");

            if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                throw new RuntimeException("Invalid Credentials");
            }
            return user;
  }
public UserProfileResponse getProfile(String userId) {

    User user = userRepository.findById(userId)
            .orElseThrow(() ->
                    new RuntimeException("User not found"));

    return UserProfileResponse.builder()
            .id(user.getId())
            .firstName(user.getFirstName())
            .lastName(user.getLastName())
            .email(user.getEmail())
            .age(user.getAge())
            .height(user.getHeight())
            .weight(user.getWeight())
            .gender(user.getGender())
            .fitnessGoal(user.getFitnessGoal())
            .experienceLevel(user.getExperienceLevel())
            .bmi(user.getBMI())
            .activityLevel(user.getActivityLevel())
.dietPreference(user.getDietPreference())
            .build();
}

public UserProfileResponse updateProfile(
        String userId,
        UserProfileRequest request) {

    User user = userRepository.findById(userId)
            .orElseThrow(() ->
                    new RuntimeException("User not found"));

    user.setAge(request.getAge());
    user.setHeight(request.getHeight());
    user.setWeight(request.getWeight());
    user.setGender(request.getGender());
    user.setFitnessGoal(request.getFitnessGoal());
    user.setExperienceLevel(request.getExperienceLevel());
    user.setActivityLevel(request.getActivityLevel());

    user.setDietPreference(request.getDietPreference());
    User savedUser = userRepository.save(user);

    return UserProfileResponse.builder()
            .id(savedUser.getId())
            .firstName(savedUser.getFirstName())
            .lastName(savedUser.getLastName())
            .email(savedUser.getEmail())
            .age(savedUser.getAge())
            .height(savedUser.getHeight())
            .weight(savedUser.getWeight())
            .gender(savedUser.getGender())
            .fitnessGoal(savedUser.getFitnessGoal())
            .experienceLevel(savedUser.getExperienceLevel())
            .bmi(savedUser.getBMI())
            .build();
}
}
