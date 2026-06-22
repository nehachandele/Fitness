package com.project.fitness.service;

import java.time.Instant;
import java.time.ZoneOffset;
import java.util.List;

import org.springframework.stereotype.Service;

import com.project.fitness.dto.RegisterRequest;
import com.project.fitness.dto.UserResponse;
import com.project.fitness.model.User;
import com.project.fitness.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class UserService {
  private final UserRepository userRepository;

  public UserResponse register(RegisterRequest request) {
    User user = User.builder()
        .email(request.getEmail())
        .firstName(request.getFirstName())
        .lastName(request.getLastName())
        .password(request.getPassword())
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

}
