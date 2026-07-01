# 🛒 Scalable E-Commerce Platform using Microservices

> A production-inspired **Microservices-based E-Commerce Platform** built using **FastAPI, PostgreSQL, Docker, Redis, RabbitMQ, and React**. This project demonstrates modern backend architecture, distributed system concepts, API Gateway design, asynchronous communication, caching, containerization, and scalable application development.

---

# 📌 Table of Contents

* Project Overview
* Key Features
* System Architecture
* Microservices
* Technology Stack
* Project Structure
* Backend Architecture
* Frontend Architecture
* Database Design
* API Gateway
* Authentication & Authorization
* Redis Caching
* RabbitMQ Messaging
* Docker Architecture
* API Documentation
* Installation
* Running the Project
* Docker Deployment
* Testing
* Future Enhancements
* Learning Outcomes
* Folder Structure
* Screenshots
* Author

---

# 🚀 Project Overview

Modern e-commerce applications are built using distributed architectures instead of monolithic systems. This project demonstrates how multiple independent services work together to provide a complete online shopping experience.

Each business capability is implemented as an independent microservice, making the application scalable, maintainable, and easier to deploy.

The system supports:

* User Registration
* JWT Authentication
* Product Management
* Shopping Cart
* Checkout
* Payment Processing
* Notification System
* Redis Caching
* RabbitMQ Event Messaging
* API Gateway
* Docker Containerization

---

# 📊 Project Statistics

| Metric                  | Value |
| ----------------------- | ----: |
| Total Microservices     |     6 |
| API Gateway             |     1 |
| Redis Cache             |     1 |
| RabbitMQ Broker         |     1 |
| PostgreSQL Databases    |     6 |
| Docker Containers       |    9+ |
| REST APIs               |   40+ |
| Database Tables         |   10+ |
| Authentication          |   JWT |
| Docker Compose Services |     9 |
| Planned React Pages     |   15+ |
| Admin Pages             |    6+ |
| Technologies Used       |   20+ |

---

# 🎯 Objectives

The primary objectives of this project are:

* Understand Microservices Architecture
* Learn Service-to-Service Communication
* Implement JWT Authentication
* Build REST APIs using FastAPI
* Use Docker for containerization
* Implement Redis Caching
* Implement RabbitMQ Messaging
* Understand API Gateway Pattern
* Learn scalable backend architecture
* Build a production-ready portfolio project

---

# ⭐ Features

## User Features

* User Registration
* Secure Login
* JWT Authentication
* User Profile
* Product Browsing
* Product Search
* Shopping Cart
* Checkout
* Payment
* Order History
* Notifications

## Admin Features

* Manage Products
* Manage Orders
* Manage Users
* Inventory Management
* Dashboard
* Analytics (planned)

---

# 🏗 Microservices

## 1. User Service

Responsibilities:

* User Registration
* Login
* JWT Token Generation
* Password Hashing
* User Profile Management

Database

* userdb

---

## 2. Product Service

Responsibilities

* Product CRUD
* Inventory
* Categories
* Product Search
* Pagination
* Redis Cache

Database

* productdb

---

## 3. Cart Service

Responsibilities

* Add to Cart
* Remove from Cart
* Update Quantity
* View Cart
* Cart Validation

Database

* cartdb

---

## 4. Order Service

Responsibilities

* Checkout
* Order Creation
* Order Tracking
* Order Status
* Order History

Database

* orderdb

---

## 5. Payment Service

Responsibilities

* Payment Processing
* Payment Validation
* Transaction Recording
* Order Status Update

Database

* paymentdb

---

## 6. Notification Service

Responsibilities

* Email Notification
* Payment Notification
* Order Notification
* RabbitMQ Consumer

Database

* notificationdb

---

# 🌐 API Gateway

All frontend requests pass through a single API Gateway.

Benefits:

* Single Entry Point
* Centralized Routing
* Easier Authentication
* Future Rate Limiting
* Future Load Balancing
* Better Security
* Simplified Frontend Communication

Example

Frontend

↓

API Gateway

↓

User Service

↓

Product Service

↓

Cart Service

↓

Order Service

↓

Payment Service

↓

Notification Service

---

# 🔐 Authentication

Authentication is implemented using JWT.

Flow

Register

↓

Login

↓

JWT Token

↓

Protected APIs

↓

Authorization

Features

* Password Hashing
* JWT Access Token
* Protected Routes
* Role-Based Authorization (planned)
* Token Validation

---

# ⚡ Redis Caching

Redis is used to improve application performance.

Cached Endpoints

* Product List
* Product Details

Benefits

* Faster Response Time
* Reduced Database Load
* Improved Scalability
* Better User Experience

Caching Pattern

Client

↓

Redis

↓

Cache Hit → Return

↓

Cache Miss

↓

Database

↓

Store in Redis

↓

Return Response

---

# 📨 RabbitMQ Messaging

RabbitMQ is used for asynchronous communication.

Current Flow

Payment Service

↓

RabbitMQ

↓

Notification Service

↓

Email Notification

Benefits

* Loose Coupling
* Better Performance
* Asynchronous Processing
* Improved Scalability

---

# 🐳 Docker Architecture

Each service runs in its own Docker container.

Containers

* PostgreSQL
* Redis
* RabbitMQ
* User Service
* Product Service
* Cart Service
* Order Service
* Payment Service
* Notification Service
* API Gateway

All containers communicate through Docker Compose networking.

---

# 🗄 Database Design

Separate database for every service.

| Service      | Database       |
| ------------ | -------------- |
| User         | userdb         |
| Product      | productdb      |
| Cart         | cartdb         |
| Order        | orderdb        |
| Payment      | paymentdb      |
| Notification | notificationdb |

Benefits

* Database Isolation
* Independent Scaling
* Better Fault Isolation
* Independent Deployment

---

# 🛠 Technology Stack

## Backend

* Python
* FastAPI
* SQLAlchemy
* Pydantic
* JWT
* HTTPX

## Database

* PostgreSQL

## Cache

* Redis

## Message Broker

* RabbitMQ

## Frontend

* React
* Vite
* Material UI
* Axios
* React Router

## DevOps

* Docker
* Docker Compose
* Git
* GitHub

---

# 📂 Project Structure

```text
ecommerce-platform/

├── services/
│   ├── api-gateway/
│   ├── user-service/
│   ├── product-service/
│   ├── cart-service/
│   ├── order-service/
│   ├── payment-service/
│   └── notification-service/
│
├── frontend/
│
├── docs/
│
├── docker-compose.yml
│
└── README.md
```

---

# 🚀 Installation

Clone the repository

```bash
git clone <repository-url>
```

Move into the project

```bash
cd ecommerce-platform
```

---

# 🐳 Run with Docker

```bash
docker compose up --build
```

Stop

```bash
docker compose down
```

---

# 📡 Default Ports

| Component            |  Port |
| -------------------- | ----: |
| API Gateway          |  8080 |
| User Service         |  8000 |
| Product Service      |  8001 |
| Cart Service         |  8002 |
| Order Service        |  8003 |
| Payment Service      |  8004 |
| Notification Service |  8005 |
| PostgreSQL           |  5432 |
| Redis                |  6379 |
| RabbitMQ             |  5672 |
| RabbitMQ Dashboard   | 15672 |

---

# 🧪 Testing

The project is designed to support:

* Unit Tests
* Integration Tests
* API Testing
* Docker Testing
* Health Checks

Future improvements include automated CI/CD pipelines.

---

# 📈 Planned Enhancements

* Product Reviews
* Wishlist
* Coupons
* Inventory Analytics
* Recommendation Engine
* Elasticsearch
* Prometheus
* Grafana
* GitHub Actions
* Kubernetes
* Cloud Deployment
* Payment Gateway Integration
* SMS Notifications
* Email Templates
* Admin Analytics Dashboard

---

# 📚 Learning Outcomes

This project demonstrates practical experience with:

* Microservices Architecture
* REST API Design
* FastAPI Development
* JWT Authentication
* SQLAlchemy ORM
* PostgreSQL
* Redis Caching
* RabbitMQ Messaging
* Docker
* Docker Compose
* API Gateway Pattern
* Service-to-Service Communication
* Distributed Systems Fundamentals
* Event-Driven Architecture
* Backend Scalability





# ⭐ If you found this project helpful, please consider giving it a star!
