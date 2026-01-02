# SCSRP - Project Summary

## 📌 Project Overview
The **Smart Campus Service Request Portal (SCSRP)** is a comprehensive web application designed to streamline the process of reporting, tracking, and resolving facility-related issues within a university campus. It bridges the gap between students and campus administration, ensuring a safer and more comfortable learning environment.

## 🎯 Problem Statement
Traditional methods of reporting campus issues (maintenance logs, verbal complaints, emails) are often inefficient, unorganized, and lack transparency. Students don't know if their complaint was seen, and administrators struggle to track and prioritize tasks manually.

## 💡 Solution
SCSRP provides a central digital platform where:
1.  **Students** can instantly report issues (broken furniture, electrical faults, etc.) with images and details.
2.  **Administrators** get a real-time dashboard to view, assign, and resolve these requests.
3.  **Transparency** is maintained through status updates (Pending -> In Progress -> Resolved).

## ✨ Key Features

### For Students
- **Easy Reporting**: Simple form to submit requests with category, title, description, and photo.
- **Real-Time Tracking**: See the live status of all submitted requests.
- **History View**: Access a log of all past and current requests.

### For Administrators
- **Central Dashboard**: View key statistics (Total requests, Pending count, Resolved count).
- **Request Management**: Filter requests by status or category.
- **Actionable Workflow**: Update statuses, assign tasks to specific departments (e.g., IT, Maintenance), and add internal notes.

## 🛠️ Technology Stack

| Component | Technology | Description |
|-----------|------------|-------------|
| **Frontend** | React 19 + Vite | Fast, modern, responsive UI with glassmorphism design. |
| **Backend** | Node.js + Express | RESTful API handling business logic and authentication. |
| **Database** | MySQL | Relational database storing users, requests, and metadata. |
| **Language** | TypeScript / JS | Type-safe development for backend logic. |
| **Auth** | JWT + bcrypt | Secure stateless authentication and password hashing. |

## 🚀 Future Roadmap
- **Email Notifications**: Automated emails when status changes.
- **Mobile App**: Native mobile experience for on-the-go reporting.
- **Analytics Reports**: Monthly PDF reports for campus maintenance headers.
- **Chat System**: Direct communication between student and admin on a ticket.
