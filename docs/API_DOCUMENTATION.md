# 🔧 API Documentation

## Private Students Tracker Platform - REST API

This document provides comprehensive documentation for the Private Students Tracker Platform REST API.

---

## 📋 Table of Contents

- [Base URL](#base-url)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [Authentication Endpoints](#authentication-endpoints)
- [User Management Endpoints](#user-management-endpoints)
- [Student Management Endpoints](#student-management-endpoints)
- [Session Management Endpoints](#session-management-endpoints)
- [Classroom Management Endpoints](#classroom-management-endpoints)
- [Messaging Endpoints](#messaging-endpoints)
- [Health Check Endpoints](#health-check-endpoints)

---

## Base URL

**Development**: `http://localhost:8000`  
**Production**: `https://your-domain.com/api`

---

## Authentication

The API uses **JWT (JSON Web Tokens)** for authentication. Include the token in the Authorization header:

```http
Authorization: Bearer <your-jwt-token>
```

### Role-Based Access Control

| Role | Description | Permissions |
|------|-------------|-------------|
| `ADMIN` | Full system access | All operations |
| `MODERATOR` | System oversight | Read/Write most resources |
| `TEACHER` | Basic access | Limited to assigned sessions |

---

## Error Handling

All API endpoints return standardized error responses:

```json
{
  "error": "Error message",
  "statusCode": 400,
  "timestamp": "2024-01-15T10:30:00.000Z",
  "path": "/api/endpoint"
}
```

### HTTP Status Codes

| Code | Description |
|------|-------------|
| `200` | Success |
| `201` | Created |
| `400` | Bad Request |
| `401` | Unauthorized |
| `403` | Forbidden |
| `404` | Not Found |
| `409` | Conflict |
| `429` | Too Many Requests |
| `500` | Internal Server Error |

---

## Rate Limiting

- **Window**: 15 minutes
- **Max Requests**: 100 per window per IP
- **Headers**: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

---

## Authentication Endpoints

### Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "TEACHER"
  }
}
```

### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe",
  "role": "TEACHER"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "1",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "TEACHER"
  }
}
```

### Master Password Unlock
```http
POST /auth/master-unlock
```

**Request Body:**
```json
{
  "password": "masterPassword123"
}
```

**Response:**
```json
{
  "message": "Master unlock successful",
  "access": "granted"
}
```

---

## User Management Endpoints

### Get All Users
```http
GET /auth/users
```

**Headers:**
```http
Authorization: Bearer <admin-token>
```

**Response:**
```json
[
  {
    "id": "1",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "TEACHER",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

### Get User by ID
```http
GET /auth/users/:id
```

**Response:**
```json
{
  "id": "1",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "TEACHER",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### Create User
```http
POST /auth/create-user
```

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "password": "tempPassword123",
  "name": "Jane Smith",
  "role": "MODERATOR"
}
```

### Update User
```http
PUT /auth/users/:id
```

**Request Body:**
```json
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "role": "MODERATOR"
}
```

### Delete User
```http
DELETE /auth/users/:id
```

**Response:**
```json
{
  "message": "User deleted successfully"
}
```

---

## Student Management Endpoints

### Get All Students
```http
GET /students
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `status` (optional): Filter by status (ACTIVE, INACTIVE, SUSPENDED)
- `search` (optional): Search by name or email

**Response:**
```json
{
  "data": [
    {
      "id": "1",
      "name": "Student Name",
      "email": "student@example.com",
      "phone": "+1234567890",
      "status": "ACTIVE",
      "subjects": ["Math", "Physics"],
      "emergencyContact": {
        "name": "Parent Name",
        "phone": "+1234567890",
        "relation": "Parent"
      },
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

### Get Student by ID
```http
GET /students/:id
```

### Create Student
```http
POST /students
```

**Request Body:**
```json
{
  "name": "New Student",
  "email": "student@example.com",
  "phone": "+1234567890",
  "subjects": ["Math", "Science"],
  "emergencyContact": {
    "name": "Parent Name",
    "phone": "+1234567890",
    "relation": "Parent"
  }
}
```

### Update Student
```http
PUT /students/:id
```

### Delete Student
```http
DELETE /students/:id
```

---

## Session Management Endpoints

### Get All Sessions
```http
GET /sessions
```

**Query Parameters:**
- `teacherId` (optional): Filter by teacher
- `studentId` (optional): Filter by student
- `date` (optional): Filter by date (YYYY-MM-DD)
- `status` (optional): Filter by status (SCHEDULED, COMPLETED, CANCELLED)

**Response:**
```json
[
  {
    "id": "1",
    "title": "Math Tutoring",
    "description": "Algebra and Geometry review",
    "startTime": "2024-01-15T14:00:00.000Z",
    "endTime": "2024-01-15T15:00:00.000Z",
    "status": "SCHEDULED",
    "teacherConfirmed": false,
    "teacherNotes": null,
    "student": {
      "id": "1",
      "name": "Student Name"
    },
    "teacher": {
      "id": "1",
      "name": "Teacher Name"
    },
    "classroom": {
      "id": "1",
      "name": "Room A",
      "location": "Building 1"
    }
  }
]
```

### Create Session
```http
POST /sessions
```

**Request Body:**
```json
{
  "title": "Math Tutoring",
  "description": "Algebra review session",
  "startTime": "2024-01-15T14:00:00.000Z",
  "endTime": "2024-01-15T15:00:00.000Z",
  "studentId": "1",
  "teacherId": "1",
  "classroomId": "1"
}
```

### Confirm Session
```http
PATCH /sessions/:id/confirm
```

**Request Body:**
```json
{
  "confirmed": true,
  "notes": "Session completed successfully"
}
```

---

## Classroom Management Endpoints

### Get All Classrooms
```http
GET /classrooms
```

**Response:**
```json
[
  {
    "id": "1",
    "name": "Room A",
    "location": "Building 1, Floor 2",
    "capacity": 10,
    "equipment": ["Projector", "Whiteboard", "Computers"],
    "status": "AVAILABLE",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

### Create Classroom
```http
POST /classrooms
```

**Request Body:**
```json
{
  "name": "Room B",
  "location": "Building 1, Floor 3",
  "capacity": 15,
  "equipment": ["Smart Board", "Audio System"]
}
```

---

## Messaging Endpoints

### Send Special Request
```http
POST /messaging/special-requests
```

**Request Body:**
```json
{
  "message": "Student needs extra help with Math",
  "priority": "HIGH",
  "studentId": "1",
  "teacherId": "1"
}
```

### Get Special Requests
```http
GET /messaging/special-requests
```

**Response:**
```json
[
  {
    "id": "1",
    "message": "Student needs extra help with Math",
    "priority": "HIGH",
    "status": "PENDING",
    "student": {
      "id": "1",
      "name": "Student Name"
    },
    "teacher": {
      "id": "1",
      "name": "Teacher Name"
    },
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

---

## Health Check Endpoints

### API Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600.45,
  "version": "1.0.0",
  "environment": "development"
}
```

### Database Health Check
```http
GET /health/database
```

**Response:**
```json
{
  "status": "ok",
  "database": "connected",
  "responseTime": "2ms"
}
```

---

## Request/Response Examples

### Successful Response
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "Example"
  },
  "message": "Operation completed successfully"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Validation failed",
  "message": "Email is required",
  "statusCode": 400
}
```

---

## Authentication Flow

1. **Login**: Send credentials to `/auth/login`
2. **Receive Token**: Get JWT token in response
3. **Include Token**: Add `Authorization: Bearer <token>` header to subsequent requests
4. **Token Expiry**: Tokens expire after 24 hours, re-authenticate as needed

---

## Best Practices

### Security
- Always use HTTPS in production
- Store JWT tokens securely (httpOnly cookies recommended)
- Implement proper CORS policies
- Validate all input data
- Use rate limiting to prevent abuse

### Performance
- Use pagination for large datasets
- Implement caching where appropriate
- Optimize database queries
- Compress responses
- Use appropriate HTTP methods

### Error Handling
- Always check response status codes
- Implement retry logic for transient failures
- Log errors appropriately
- Provide meaningful error messages to users

---

## SDK and Client Libraries

### JavaScript/TypeScript
```typescript
import { PrivateStudentsTrackerAPI } from '@pvt-tracker/api-client';

const api = new PrivateStudentsTrackerAPI({
  baseURL: 'http://localhost:8000',
  token: 'your-jwt-token'
});

// Get all students
const students = await api.students.getAll();

// Create a new session
const session = await api.sessions.create({
  title: 'Math Tutoring',
  studentId: '1',
  teacherId: '1'
});
```

---

## Postman Collection

Import our Postman collection for easy API testing:

[Download Postman Collection](./Private_Students_Tracker_API.postman_collection.json)

---

## Support

For API support and questions:
- **Documentation**: This file and inline code comments
- **Issues**: GitHub Issues for bug reports
- **Discussions**: GitHub Discussions for questions
- **Email**: api-support@pvt-tracker.com

---

## Changelog

### v1.0.0 (2024-01-15)
- Initial API release
- Authentication endpoints
- User management
- Student management
- Session management
- Classroom management
- Messaging system

---

*Last updated: January 15, 2024*