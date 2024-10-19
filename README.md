# 📚 Document Management System

## 🚀 Overview
This project is a **full-stack Document Management System** built with **Go (Gin + GORM)** for the backend and **Vue.js** for the frontend. The application allows users to register, log in, and manage their personal documents securely.

## 🛠️ Features
- **User Authentication**:
  - Register new users with a username, email, and password.
  - Secure login with JWT authentication.
  
- **Document Management**:
  - Create, read, update, and delete personal documents.
  - Support for document privacy settings (Public/Private).

- **Data Security**:
  - Passwords are hashed using **bcrypt** for enhanced security.
  - User data is stored securely in a MySQL database.

## 🌐 Tech Stack
- **Frontend**: 
  - React.js
  - Axios (for API calls)

- **Backend**: 
  - Go (Gin framework)
  - GORM (ORM for database interaction)
  - MySQL (for data storage)

## 🛠️ Installation

### Prerequisites
- Go installed on your machine
- MySQL database setup

### Clone the repository
```bash
git clone https://github.com/yourusername/document-management-system.git
cd document-management-system
