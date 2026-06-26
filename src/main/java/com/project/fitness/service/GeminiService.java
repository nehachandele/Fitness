package com.project.fitness.service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private static final String MODEL =
            "gemini-2.5-flash";

    public String askGemini(String prompt) {

        try {

            JsonObject textPart = new JsonObject();
            textPart.addProperty("text", prompt);

            JsonArray parts = new JsonArray();
            parts.add(textPart);

            JsonObject content = new JsonObject();
            content.add("parts", parts);

            JsonArray contents = new JsonArray();
            contents.add(content);

            JsonObject body = new JsonObject();
            body.add("contents", contents);

            HttpRequest request =
                    HttpRequest.newBuilder()
                            .uri(
                                    URI.create(
                                            "https://generativelanguage.googleapis.com/v1beta/models/"
                                                    + MODEL
                                                    + ":generateContent?key="
                                                    + apiKey))
                            .header(
                                    "Content-Type",
                                    "application/json")
                            .POST(
                                    HttpRequest.BodyPublishers.ofString(
                                            body.toString()))
                            .build();

            HttpClient client =
                    HttpClient.newHttpClient();

            HttpResponse<String> response =
                    client.send(
                            request,
                            HttpResponse.BodyHandlers.ofString());

            JsonObject json =
                    JsonParser.parseString(
                            response.body())
                            .getAsJsonObject();

            return json
                    .getAsJsonArray("candidates")
                    .get(0)
                    .getAsJsonObject()
                    .getAsJsonObject("content")
                    .getAsJsonArray("parts")
                    .get(0)
                    .getAsJsonObject()
                    .get("text")
                    .getAsString();

        }

        catch (Exception e) {

            e.printStackTrace();

            return "Unable to generate recommendation.";

        }

    }

}