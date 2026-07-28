# 🚀 DevBytes Backend

<div align="center">

### 🧩 Microservices-Based Developer Community Platform

DevBytes is a modern developer community social media platform where developers can connect, chat in real-time, and build meaningful professional relationships.

Built with scalable backend architecture using Node.js, Express, MongoDB, JWT, and Socket.IO.

</div>

---

# ✨ Features

## 🔐 Authentication Service
- User Signup API
- User Login API
- JWT Authentication
- Protected Routes
- Password Encryption using bcrypt

---

## 👥 Connection Management Service
- Send Connection Request API
- Accept Connection Request API
- View All Connections API

---

## 👤 Profile Service
- Edit Profile API
- Update User Details API

---


# 🧩 Microservices Architecture

The backend follows a **microservices-inspired architecture** where different functionalities are divided into separate modules/services.

### Services Included:
- Authentication Service
- User Service
- Connection Service

This architecture helps in:
- Scalability
- Better Code Organization
- Independent Feature Development
- Easier Maintenance
- Cleaner API Structure

---

# 🛠️ Tech Stack

| Technology | Purpose |
|------------|----------|
| Node.js | Runtime Environment |
| Express.js | Backend Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcrypt | Password Hashing |
| Socket.IO | Real-Time Communication |

---

# 🔥 API Endpoints

## 🔑 Authentication APIs

```http
POST /signup
POST /login
```

---

## 👥 Connection APIs

```http
POST /send/request/:id
POST /accept/request/:id
GET /connections
```

---

## 👤 Profile APIs

```http
PATCH /profile/edit
```


---

# 🔐 Authentication Flow

```text
User Login
    ↓
JWT Token Generated
    ↓
Protected Route Verification
    ↓
Access Granted
```

---

# 🧠 What I Learned

While building DevBytes backend, I learned:
- REST API Design
- JWT Authentication
- MongoDB Data Modeling
- Real-Time Communication with Socket.IO
- Middleware Handling
- Scalable Backend Architecture
- Microservices-Based Project Structure

---


# ⭐ Support

If you like this project, give it a ⭐ on GitHub.

---

<div align="center">

Made with ❤️ using Node.js, Express, MongoDB & Socket.IO

</div>
