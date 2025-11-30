# Employee Attendance Management System

### 👨‍💻 Developed By

**Riyaz Shaik**
B.Tech – Artificial Intelligence & Data Science
**Vasireddy Venkatadri Institute of Technology**

📼 Demo Video:
[https://drive.google.com/file/d/1S8cqr9cSoHBZa05iG69_B3qsBDC6H3fA/view?usp=drive_link](https://drive.google.com/file/d/1S8cqr9cSoHBZa05iG69_B3qsBDC6H3fA/view?usp=drive_link)

---

## 📌 Project Overview

A full-stack **Employee Attendance Management System** with complete **role-based authentication**, real-time attendance tracking, analytics dashboards, monthly summaries, history logs, calendar views, CSV export, and manager–employee separation.

---

## 🧩 Features

### ⭐ Employee Panel

* Login / Register
* Dashboard with daily + monthly insights
* Check-In / Check-Out attendance
* Attendance History
* Monthly Summary (Pie charts + Stats)
* Profile Page

### ⭐ Manager Panel

* Manager Dashboard (team analytics)
* View attendance of all employees
* Filter by employee, date, status
* Team Calendar View
* Monthly team summaries
* Export CSV attendance reports
* View employee profiles

---

## 🛠 Tech Stack

### Frontend

* React
* React Router
* Redux Toolkit
* Tailwind CSS
* ShadCN UI
* Recharts
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Bcrypt

---

## 📁 Project Structure

```
/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── seed/
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── constants/
    │   ├── layouts/
    │   ├── pages/
    │   ├── store/
    │   └── App.jsx
```

---

## 🚀 Setup Instructions

### Backend

```bash
cd backend
npm install
npm run seed
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔗 API Endpoints Summary

### Employee

```
POST   /auth/login
POST   /auth/register
GET    /employee/dashboard
GET    /attendance/today
POST   /attendance/check-in
POST   /attendance/check-out
GET    /attendance/history
GET    /attendance/my-summary
```

### Manager

```
GET    /manager/dashboard
GET    /manager/all-attendance
GET    /manager/summary
GET    /manager/calendar
GET    /report/export
```

---

## 📦 Highlights

* Clean, scalable folder structure
* Fully role-protected routing (Employee / Manager)
* Reusable layout system with sidebar + header
* Optimized MongoDB queries for analytics
* Beautiful UI with consistent components
* Real monthly summaries generated dynamically
* CSV export for professional reporting

---

## 👨‍🎓 About the Developer

Designed and developed by **Riyaz Shaik**, B.Tech (AI & DS), Vasireddy Venkatadri Institute of Technology.

---
