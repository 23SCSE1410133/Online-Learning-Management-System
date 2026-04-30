package com.lms.config;

import com.lms.model.Course;
import com.lms.model.Enrollment;
import com.lms.model.User;
import com.lms.repository.CourseRepository;
import com.lms.repository.EnrollmentRepository;
import com.lms.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedDatabase(UserRepository userRepo, CourseRepository courseRepo,
                                    EnrollmentRepository enrollmentRepo) {
        return args -> {
            // --- Create Users ---
            User admin = new User("admin", "Admin User", "admin@lms.com", "admin123", "ADMIN");
            admin.setBio("Platform administrator");
            admin.setAvatarUrl("https://api.dicebear.com/7.x/avataaars/svg?seed=admin");

            User instructor1 = new User("dr_smith", "Dr. Sarah Smith", "sarah@lms.com", "pass123", "INSTRUCTOR");
            instructor1.setBio("PhD in Computer Science. 10+ years teaching experience in web development and software engineering.");
            instructor1.setAvatarUrl("https://api.dicebear.com/7.x/avataaars/svg?seed=sarah");

            User instructor2 = new User("prof_jones", "Prof. Michael Jones", "michael@lms.com", "pass123", "INSTRUCTOR");
            instructor2.setBio("Full-stack developer turned educator. Passionate about making complex topics simple.");
            instructor2.setAvatarUrl("https://api.dicebear.com/7.x/avataaars/svg?seed=michael");

            User instructor3 = new User("dr_patel", "Dr. Priya Patel", "priya@lms.com", "pass123", "INSTRUCTOR");
            instructor3.setBio("Data Science expert with industry experience at Google and Amazon.");
            instructor3.setAvatarUrl("https://api.dicebear.com/7.x/avataaars/svg?seed=priya");

            User student1 = new User("john_doe", "John Doe", "john@lms.com", "pass123", "STUDENT");
            student1.setBio("Computer Science student passionate about full-stack development.");
            student1.setAvatarUrl("https://api.dicebear.com/7.x/avataaars/svg?seed=john");

            User student2 = new User("jane_doe", "Jane Williams", "jane@lms.com", "pass123", "STUDENT");
            student2.setBio("Aspiring data scientist with a background in mathematics.");
            student2.setAvatarUrl("https://api.dicebear.com/7.x/avataaars/svg?seed=jane");

            userRepo.save(admin);
            userRepo.save(instructor1);
            userRepo.save(instructor2);
            userRepo.save(instructor3);
            userRepo.save(student1);
            userRepo.save(student2);

            // --- Create Courses ---
            Course c1 = new Course("React - The Complete Guide", 
                "Master React from the ground up. Learn Hooks, Redux, React Router, Next.js, and build real-world projects with modern best practices.",
                "Web Development", "Beginner", "40 hours", 49.99, 120);
            c1.setInstructor(instructor1);
            c1.setRating(4.8);
            c1.setTotalStudents(15240);
            c1.setThumbnailUrl("https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800");

            Course c2 = new Course("Java Spring Boot Masterclass",
                "Build enterprise-grade RESTful APIs with Spring Boot 3, Spring Data JPA, Spring Security, and deploy to AWS.",
                "Backend Development", "Intermediate", "35 hours", 59.99, 98);
            c2.setInstructor(instructor2);
            c2.setRating(4.7);
            c2.setTotalStudents(8320);
            c2.setThumbnailUrl("https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800");

            Course c3 = new Course("Node.js & Express - Complete Backend",
                "Learn server-side JavaScript with Node.js and Express. Build REST APIs, handle authentication, work with MongoDB and PostgreSQL.",
                "Backend Development", "Beginner", "28 hours", 39.99, 85);
            c3.setInstructor(instructor1);
            c3.setRating(4.6);
            c3.setTotalStudents(12450);
            c3.setThumbnailUrl("https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800");

            Course c4 = new Course("Data Structures & Algorithms in Java",
                "Master DSA concepts with Java. Covers arrays, linked lists, trees, graphs, sorting, searching, and dynamic programming.",
                "Computer Science", "Intermediate", "45 hours", 69.99, 150);
            c4.setInstructor(instructor2);
            c4.setRating(4.9);
            c4.setTotalStudents(22100);
            c4.setThumbnailUrl("https://images.unsplash.com/photo-1515879218367-8466d910auj7?w=800");

            Course c5 = new Course("Python for Data Science & ML",
                "Complete Python bootcamp for Data Science. Learn NumPy, Pandas, Matplotlib, Scikit-Learn, and build ML models from scratch.",
                "Data Science", "Beginner", "50 hours", 54.99, 130);
            c5.setInstructor(instructor3);
            c5.setRating(4.8);
            c5.setTotalStudents(31200);
            c5.setThumbnailUrl("https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800");

            Course c6 = new Course("Full-Stack Web Development Bootcamp",
                "From zero to full-stack hero. HTML, CSS, JavaScript, React, Node.js, MongoDB — build and deploy 10+ projects.",
                "Web Development", "Beginner", "65 hours", 79.99, 200);
            c6.setInstructor(instructor1);
            c6.setRating(4.7);
            c6.setTotalStudents(45600);
            c6.setThumbnailUrl("https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800");

            Course c7 = new Course("Advanced CSS & Modern UI Design",
                "Master CSS Grid, Flexbox, animations, glassmorphism, and responsive design. Build stunning, production-ready interfaces.",
                "Web Development", "Intermediate", "22 hours", 34.99, 65);
            c7.setInstructor(instructor2);
            c7.setRating(4.5);
            c7.setTotalStudents(9800);
            c7.setThumbnailUrl("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800");

            Course c8 = new Course("Database Design & SQL Mastery",
                "Learn relational database design, complex SQL queries, indexing, normalization, and work with MySQL and PostgreSQL.",
                "Database", "Beginner", "20 hours", 29.99, 55);
            c8.setInstructor(instructor3);
            c8.setRating(4.6);
            c8.setTotalStudents(7650);
            c8.setThumbnailUrl("https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800");

            courseRepo.save(c1);
            courseRepo.save(c2);
            courseRepo.save(c3);
            courseRepo.save(c4);
            courseRepo.save(c5);
            courseRepo.save(c6);
            courseRepo.save(c7);
            courseRepo.save(c8);

            // --- Create Enrollments for demo student ---
            Enrollment e1 = new Enrollment(student1, c1);
            e1.setProgress(72.0);

            Enrollment e2 = new Enrollment(student1, c2);
            e2.setProgress(45.0);

            Enrollment e3 = new Enrollment(student1, c5);
            e3.setProgress(88.0);

            Enrollment e4 = new Enrollment(student2, c1);
            e4.setProgress(30.0);

            Enrollment e5 = new Enrollment(student2, c6);
            e5.setProgress(15.0);

            enrollmentRepo.save(e1);
            enrollmentRepo.save(e2);
            enrollmentRepo.save(e3);
            enrollmentRepo.save(e4);
            enrollmentRepo.save(e5);

            System.out.println("==============================================");
            System.out.println("  LMS Database seeded successfully!");
            System.out.println("  Demo Login: john@lms.com / pass123");
            System.out.println("==============================================");
        };
    }
}
