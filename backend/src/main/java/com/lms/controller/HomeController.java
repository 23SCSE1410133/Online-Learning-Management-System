package com.lms.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.LinkedHashMap;

@RestController
public class HomeController {

    @GetMapping("/")
    public Map<String, Object> home() {
        Map<String, Object> info = new LinkedHashMap<>();
        info.put("app", "EduVerse LMS Backend API");
        info.put("status", "running");
        info.put("version", "1.0.0");

        Map<String, String> endpoints = new LinkedHashMap<>();
        endpoints.put("courses", "/api/courses");
        endpoints.put("course_by_id", "/api/courses/{id}");
        endpoints.put("search", "/api/courses/search?keyword=react");
        endpoints.put("login", "POST /api/users/login");
        endpoints.put("register", "POST /api/users/register");
        endpoints.put("enrollments", "/api/enrollments/user/{userId}");
        endpoints.put("h2_console", "/h2-console");

        info.put("endpoints", endpoints);
        info.put("frontend", "http://localhost:5173");
        return info;
    }
}
