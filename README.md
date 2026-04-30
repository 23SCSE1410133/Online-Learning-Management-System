# 🎓 EduVerse — Full-Stack Learning Management System

A modern, full-stack Learning Management System (LMS) built with **React**, **Node.js**, and **Java Spring Boot**. This project demonstrates a complete software engineering workflow with a premium, responsive UI.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│                   Frontend                      │
│          React + Vite (Port 5173)               │
│    Pages: Landing, Courses, Dashboard, Auth     │
│    Styling: Vanilla CSS (Glassmorphism/Dark)    │
├─────────────────────────────────────────────────┤
│               REST API (JSON)                   │
├─────────────────────────────────────────────────┤
│                   Backend                       │
│        Java Spring Boot (Port 8080)             │
│   Controllers → Services → Repositories        │
│          Spring Data JPA + H2 Database          │
└─────────────────────────────────────────────────┘
```

## 🛠️ Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| **Frontend** | React 19, Vite, React Router, Vanilla CSS |
| **Backend**  | Java 17, Spring Boot 3.2, Spring Data JPA |
| **Database** | H2 (dev, in-memory) / MySQL (production)  |
| **Tooling**  | Node.js, npm, Maven                       |

## 📂 Project Structure

```
Online-Learning-Management-System/
├── frontend/                    # React SPA
│   ├── src/
│   │   ├── components/          # Navbar, CourseCard, Footer
│   │   ├── context/             # AuthContext (user state)
│   │   ├── pages/               # Landing, Auth, Courses, Dashboard
│   │   ├── services/            # API service layer
│   │   ├── index.css            # Global design system
│   │   ├── App.jsx              # Router & layout
│   │   └── main.jsx             # Entry point
│   └── package.json
│
├── backend/                     # Spring Boot API
│   ├── src/main/java/com/lms/
│   │   ├── model/               # User, Course, Enrollment, Event
│   │   ├── repository/          # JPA repositories
│   │   ├── service/             # Business logic
│   │   ├── controller/          # REST endpoints
│   │   ├── config/              # CORS, DataSeeder
│   │   └── LmsApplication.java # Entry point
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
├── archive/                     # Original project files
└── README.md
```

## 🚀 How to Run

### Prerequisites
- **Node.js** (v18+) — [Download](https://nodejs.org/)
- **Java JDK 17+** — [Download](https://adoptium.net/)
- **Maven** — [Download](https://maven.apache.org/) (or use `./mvnw` wrapper)

### Step 1: Start the Backend (Java Spring Boot)

```bash
cd backend
./mvnw spring-boot:run
# Or if you have Maven installed globally:
# mvn spring-boot:run
```

The backend will start on **http://localhost:8080**.

> The H2 database is auto-seeded with demo data on every startup.
> H2 Console: http://localhost:8080/h2-console (JDBC URL: `jdbc:h2:mem:lmsdb`)

### Step 2: Start the Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on **http://localhost:5173**.

### Step 3: Open in Browser 🎉

👉 **Open http://localhost:5173** in your browser!

### Demo Login Credentials
| Role       | Email            | Password |
|------------|------------------|----------|
| Student    | john@lms.com     | pass123  |
| Student    | jane@lms.com     | pass123  |
| Instructor | sarah@lms.com    | pass123  |
| Instructor | michael@lms.com  | pass123  |
| Admin      | admin@lms.com    | admin123 |

## 📡 API Endpoints

| Method | Endpoint                          | Description              |
|--------|-----------------------------------|--------------------------|
| GET    | `/api/courses`                    | Get all courses          |
| GET    | `/api/courses/{id}`               | Get course by ID         |
| GET    | `/api/courses/search?keyword=`    | Search courses           |
| GET    | `/api/courses/category/{cat}`     | Filter by category       |
| POST   | `/api/users/login`                | User login               |
| POST   | `/api/users/register`             | User registration        |
| GET    | `/api/enrollments/user/{userId}`  | Get user's enrollments   |
| POST   | `/api/enrollments`                | Enroll in a course       |
| PUT    | `/api/enrollments/{id}/progress`  | Update progress          |

## ✨ Features

- 🌙 **Premium Dark Theme** with glassmorphism and gradient effects
- 🎨 **Animated UI** with micro-animations and smooth transitions
- 🔍 **Course Search & Filters** by category and difficulty level
- 📊 **Student Dashboard** with progress tracking
- 🔐 **Authentication** with login/register flows
- 📱 **Fully Responsive** mobile-first design
- ⚡ **Fast Loading** with skeleton screens

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
