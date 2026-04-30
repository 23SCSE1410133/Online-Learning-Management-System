package com.lms.controller;

import com.lms.model.Enrollment;
import com.lms.service.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    @GetMapping("/user/{userId}")
    public List<Enrollment> getEnrollmentsByUser(@PathVariable Long userId) {
        return enrollmentService.findByUserId(userId);
    }

    @GetMapping("/course/{courseId}")
    public List<Enrollment> getEnrollmentsByCourse(@PathVariable Long courseId) {
        return enrollmentService.findByCourseId(courseId);
    }

    @GetMapping("/check")
    public Map<String, Boolean> checkEnrollment(@RequestParam Long userId, @RequestParam Long courseId) {
        Map<String, Boolean> response = new HashMap<>();
        response.put("enrolled", enrollmentService.isEnrolled(userId, courseId));
        return response;
    }

    @PostMapping
    public ResponseEntity<?> enroll(@RequestBody Map<String, Long> request) {
        try {
            Enrollment enrollment = enrollmentService.enroll(request.get("userId"), request.get("courseId"));
            return ResponseEntity.ok(enrollment);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PutMapping("/{id}/progress")
    public ResponseEntity<Enrollment> updateProgress(@PathVariable Long id, @RequestBody Map<String, Double> request) {
        Enrollment enrollment = enrollmentService.updateProgress(id, request.get("progress"));
        return ResponseEntity.ok(enrollment);
    }

    @DeleteMapping
    public ResponseEntity<Void> unenroll(@RequestParam Long userId, @RequestParam Long courseId) {
        enrollmentService.unenroll(userId, courseId);
        return ResponseEntity.ok().build();
    }
}
