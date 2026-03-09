# 🏫 Elbilia School Connect

![TypeScript](https://img.shields.io/badge/TypeScript-4.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

> A modern school management portal built with TypeScript + React — connecting students, teachers, and administrators in one unified platform.

---

## 🎯 Overview

Elbilia School Connect is a full-stack TypeScript application designed to digitize and streamline academic operations. It demonstrates real-world TypeScript architecture including strict typing, reusable component libraries, and type-safe API integration.

---

## ✨ Features

- 👨‍🎓 **Student Portal** — Course enrollment, grades, schedule, announcements
- 👩‍🏫 **Teacher Dashboard** — Class management, grade submission, attendance tracking
- 🏛️ **Admin Panel** — User management, academic calendar, reports
- 📅 **Schedule Management** — Class timetables, room assignments, conflict detection
- 📢 **Communication Hub** — Announcements, messaging between roles
- 📊 **Analytics** — Attendance rates, grade distributions, academic performance
- 🔒 **Role-Based Access** — JWT authentication with student/teacher/admin roles

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | TypeScript, React 18, Tailwind CSS |
| State Management | React Context / useState hooks |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL / MongoDB |
| Auth | JWT tokens with role-based access control |
| Build | Vite, ESLint, Prettier |

---

## 📁 Project Structure

```
elbilia-school-connect/
├── src/
│   ├── components/          # Reusable UI components (typed)
│   │   ├── shared/
│   │   ├── student/
│   │   ├── teacher/
│   │   └── admin/
│   ├── pages/               # Route-level page components
│   ├── hooks/               # Custom React hooks
│   ├── services/            # API service layer (typed)
│   ├── types/               # TypeScript interfaces & types
│   │   ├── user.types.ts
│   │   ├── course.types.ts
│   │   └── grade.types.ts
│   ├── context/             # Global state providers
│   └── utils/               # Helpers and formatters
├── server/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── middleware/
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

```bash
node >= 18.0.0
npm >= 9.0.0
```

### Installation

```bash
# Clone
git clone https://github.com/Adilchagri/elbilia-school-connect.git
cd elbilia-school-connect

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Fill in your DB connection and JWT secret

# Development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🔷 TypeScript Highlights

```typescript
// Strict typing example — User role system
interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  createdAt: Date;
}

// Type-safe API service
async function getStudentGrades(studentId: string): Promise<Grade[]> {
  const response = await api.get<ApiResponse<Grade[]>>(`/students/${studentId}/grades`);
  return response.data.payload;
}
```

---

## 🔒 Authentication Flow

```
Login → JWT issued → Role decoded → Protected routes rendered per role
         ↓
   Student: /dashboard, /courses, /grades
   Teacher: /classes, /attendance, /grading
   Admin:   /users, /reports, /settings
```

---

## 👤 Author

**Adil Chagri** — [github.com/Adilchagri](https://github.com/Adilchagri) | [linkedin.com/in/adilchagri](https://linkedin.com/in/adilchagri)

---

## 📄 License

MIT License
