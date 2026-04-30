const API_BASE = 'http://localhost:8080/api';

// ---- Courses ----
export async function fetchCourses() {
  const res = await fetch(`${API_BASE}/courses`);
  if (!res.ok) throw new Error('Failed to fetch courses');
  return res.json();
}

export async function fetchCourseById(id) {
  const res = await fetch(`${API_BASE}/courses/${id}`);
  if (!res.ok) throw new Error('Failed to fetch course');
  return res.json();
}

export async function searchCourses(keyword) {
  const res = await fetch(`${API_BASE}/courses/search?keyword=${encodeURIComponent(keyword)}`);
  if (!res.ok) throw new Error('Search failed');
  return res.json();
}

export async function fetchCoursesByCategory(category) {
  const res = await fetch(`${API_BASE}/courses/category/${encodeURIComponent(category)}`);
  if (!res.ok) throw new Error('Failed to fetch courses by category');
  return res.json();
}

// ---- Users ----
export async function loginUser(email, password) {
  const res = await fetch(`${API_BASE}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  return data;
}

export async function registerUser(userData) {
  const res = await fetch(`${API_BASE}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Registration failed');
  return data;
}

export async function fetchInstructors() {
  const res = await fetch(`${API_BASE}/users/instructors`);
  if (!res.ok) throw new Error('Failed to fetch instructors');
  return res.json();
}

// ---- Enrollments ----
export async function fetchEnrollmentsByUser(userId) {
  const res = await fetch(`${API_BASE}/enrollments/user/${userId}`);
  if (!res.ok) throw new Error('Failed to fetch enrollments');
  return res.json();
}

export async function enrollInCourse(userId, courseId) {
  const res = await fetch(`${API_BASE}/enrollments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, courseId }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Enrollment failed');
  return data;
}

export async function checkEnrollment(userId, courseId) {
  const res = await fetch(`${API_BASE}/enrollments/check?userId=${userId}&courseId=${courseId}`);
  if (!res.ok) throw new Error('Failed to check enrollment');
  return res.json();
}

export async function updateProgress(enrollmentId, progress) {
  const res = await fetch(`${API_BASE}/enrollments/${enrollmentId}/progress`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ progress }),
  });
  if (!res.ok) throw new Error('Failed to update progress');
  return res.json();
}
