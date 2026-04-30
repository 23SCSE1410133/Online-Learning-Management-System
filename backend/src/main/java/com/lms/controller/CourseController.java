package com.lms.controller;

import com.lms.model.Course;
import com.lms.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {
        return courseService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{category}")
    public List<Course> getCoursesByCategory(@PathVariable String category) {
        return courseService.findByCategory(category);
    }

    @GetMapping("/level/{level}")
    public List<Course> getCoursesByLevel(@PathVariable String level) {
        return courseService.findByLevel(level);
    }

    @GetMapping("/search")
    public List<Course> searchCourses(@RequestParam String keyword) {
        return courseService.search(keyword);
    }

    @PostMapping
    public Course createCourse(@RequestBody Course course) {
        return courseService.save(course);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable Long id, @RequestBody Course courseDetails) {
        return courseService.findById(id)
                .map(course -> {
                    course.setTitle(courseDetails.getTitle());
                    course.setDescription(courseDetails.getDescription());
                    course.setCategory(courseDetails.getCategory());
                    course.setLevel(courseDetails.getLevel());
                    course.setDuration(courseDetails.getDuration());
                    course.setPrice(courseDetails.getPrice());
                    course.setThumbnailUrl(courseDetails.getThumbnailUrl());
                    return ResponseEntity.ok(courseService.save(course));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        if (courseService.findById(id).isPresent()) {
            courseService.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
