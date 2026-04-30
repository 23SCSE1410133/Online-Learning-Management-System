package com.lms.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "enrollments")
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    private Double progress; // 0.0 to 100.0

    @Column(updatable = false)
    private LocalDateTime enrollmentDate;

    @PrePersist
    protected void onCreate() {
        this.enrollmentDate = LocalDateTime.now();
        if (this.progress == null) this.progress = 0.0;
    }

    // Constructors
    public Enrollment() {}

    public Enrollment(User user, Course course) {
        this.user = user;
        this.course = course;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }

    public Double getProgress() { return progress; }
    public void setProgress(Double progress) { this.progress = progress; }

    public LocalDateTime getEnrollmentDate() { return enrollmentDate; }
}
