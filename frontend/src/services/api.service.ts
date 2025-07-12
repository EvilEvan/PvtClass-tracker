/**
 * API Service using Axios
 * Centralized HTTP client for all API requests
 */
import axios, { AxiosInstance, AxiosError } from 'axios';
import { BACKEND_URL } from '../config/api';

// Types for API responses
export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'TEACHER' | 'MODERATOR';
  createdAt?: string;
}

export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: 'ADMIN' | 'TEACHER' | 'MODERATOR';
}

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: BACKEND_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      (error: AxiosError) => {
        // Handle common errors
        if (error.response?.status === 401) {
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Authentication methods
  async checkAdminExists(): Promise<ApiResponse<{ hasAdmin: boolean }>> {
    try {
      const response = await this.client.get('/auth/check-admin');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createUser(userData: CreateUserRequest): Promise<ApiResponse<User>> {
    try {
      const response = await this.client.post('/auth/create-user', userData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async login(credentials: { email: string; password: string }): Promise<{ access_token: string; user: User }> {
    try {
      const response = await this.client.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getAllUsers(): Promise<ApiResponse<User[]>> {
    try {
      const response = await this.client.get('/auth/users');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deleteUser(userId: string): Promise<ApiResponse> {
    try {
      const response = await this.client.delete(`/auth/users/${userId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateUserRole(userId: string, role: string): Promise<ApiResponse<User>> {
    try {
      const response = await this.client.patch(`/auth/users/${userId}`, { role });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async masterUnlock(password: string): Promise<ApiResponse<{ valid: boolean }>> {
    try {
      const response = await this.client.post('/auth/master-unlock', { password });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<ApiResponse<{ message: string; user: User }>> {
    try {
      const response = await this.client.put(`/auth/users/${userId}/password`, {
        currentPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Student management methods
  async getStudents(): Promise<ApiResponse<any[]>> {
    try {
      const response = await this.client.get('/students');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createStudent(studentData: any): Promise<ApiResponse<any>> {
    try {
      const response = await this.client.post('/students', studentData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateStudent(studentId: string, studentData: any): Promise<ApiResponse<any>> {
    try {
      const response = await this.client.patch(`/students/${studentId}`, studentData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deleteStudent(studentId: string): Promise<ApiResponse> {
    try {
      const response = await this.client.delete(`/students/${studentId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Session management methods
  async getSessions(): Promise<ApiResponse<any[]>> {
    try {
      const response = await this.client.get('/sessions');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createSession(sessionData: any): Promise<ApiResponse<any>> {
    try {
      const response = await this.client.post('/sessions', sessionData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateSession(sessionId: string, sessionData: any): Promise<ApiResponse<any>> {
    try {
      const response = await this.client.patch(`/sessions/${sessionId}`, sessionData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deleteSession(sessionId: string): Promise<ApiResponse> {
    try {
      const response = await this.client.delete(`/sessions/${sessionId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Classroom management methods
  async getClassrooms(): Promise<ApiResponse<any[]>> {
    try {
      const response = await this.client.get('/classrooms');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createClassroom(classroomData: any): Promise<ApiResponse<any>> {
    try {
      const response = await this.client.post('/classrooms', classroomData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateClassroom(classroomId: string, classroomData: any): Promise<ApiResponse<any>> {
    try {
      const response = await this.client.patch(`/classrooms/${classroomId}`, classroomData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deleteClassroom(classroomId: string): Promise<ApiResponse> {
    try {
      const response = await this.client.delete(`/classrooms/${classroomId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Error handling
  private handleError(error: any): Error {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const message = error.response.data?.message || error.response.statusText;
      return new Error(`API Error: ${message}`);
    } else if (error.request) {
      // The request was made but no response was received
      return new Error('Network Error: No response received from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      return new Error(`Request Error: ${error.message}`);
    }
  }
}

// Export a singleton instance
export const apiService = new ApiService();
export default apiService;
