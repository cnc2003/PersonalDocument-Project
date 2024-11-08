# 📚 Document Management System

## 🚀 Overview
This project is a **full-stack Document Management System** built with **Go (Gin + GORM)** for the backend and **React.js** for the frontend. The application allows users to register, log in, and manage their personal documents securely.

![image](https://github.com/user-attachments/assets/87b7be09-9089-4da6-9c27-4a91e772384f)

## 🛠️ Features
### User Authentication
- Register new users with a username, email, and password.
- Secure login with JWT authentication.

### Document Management
- Create, read, update, and delete personal documents.
- Support for document privacy settings (Public/Private).

### Data Security
- Passwords are hashed using **bcrypt** for enhanced security.
- User data is stored securely in a MySQL database.

## 🌐 Tech Stack
### Frontend
- **React.js**
- **Axios** (for API calls)

### Backend
- **Go** (Gin framework)
- **GORM** (ORM for database interaction)
- **MySQL** (for data storage)

## 🛠️ Installation

### Prerequisites
- Go installed on your machine
- MySQL database setup

### Clone the Repository
```bash
git clone https://github.com/cnc2003/document-management-system.git
cd document-management-system
```
```env for backend
DB_HOST=<host>
DB_PORT=<port>
DB_USER=<user>
DB_PASSWORD=<password>
DB_NAME=<database name>
JWT_SECRET=<your secret>
```
## 🚀 Showcase

