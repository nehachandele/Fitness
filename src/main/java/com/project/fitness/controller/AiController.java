package com.project.fitness.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.fitness.service.GeminiService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AiController {

    private final GeminiService geminiService;

    @GetMapping("/api/ai/test")
    public String testAI(
            @RequestParam String prompt) {

        return geminiService.askGemini(prompt);

    }

}