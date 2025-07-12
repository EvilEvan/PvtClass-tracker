# Comprehensive Action Plan

This document outlines a phased action plan to address audit findings, enhancing the application's security, quality, and maintainability.

## Phase 1: Critical Security Remediation (Highest Priority)
This phase addresses the most severe vulnerabilities. The application is not secure until these tasks are complete.

- [ ] **1. Implement API Authorization (Backend)**
    - [ ] Apply the `@UseGuards(JwtAuthGuard)` decorator to all controllers handling sensitive data (e.g., `StudentsController`, `ClassroomsController`, `SessionsController`).
    - [ ] Verify that unauthenticated requests to protected endpoints are rejected with a `401 Unauthorized` error.

- [ ] **2. Secure JWT Storage (Full Stack)**
    - [ ] **Backend:** Modify `auth.service.ts` to set the JWT in a secure, `HttpOnly` cookie upon login, instead of returning it in the response body.
    - [ ] **Frontend:** Remove all code that saves or retrieves the JWT from `localStorage`.
    - [ ] **Frontend:** Configure the API client (Axios) to send credentials (cookies) with every request by setting `withCredentials: true`.
    - [ ] **Frontend:** Implement logout logic that calls a backend endpoint to clear the authentication cookie.

## Phase 2: Foundational Improvements (High Priority)
This phase strengthens the core architecture.

- [ ] **3. Harden Backend Configuration**
    - [ ] **Environment Variables:** Integrate `@nestjs/config`. Move secrets (database URL, JWT secret) to a `.env` file and access them via `process.env`.
    - [ ] **CORS Policy:** In `main.ts`, update `app.enableCors()` to restrict the origin to the production frontend URL, stored in the `.env` file.

- [ ] **4. Refactor Frontend Architecture**
    - [ ] **Global State Management:** Create a React Context provider for authentication to manage and globally distribute user authentication status.
    - [ ] **Client-Side Route Protection:** Implement a private route component/HOC using the auth context to protect authenticated pages and redirect unauthenticated users.
    - [ ] **Centralize API Logic:**
        - [ ] Move the API base URL to a `.env.local` file (e.g., `NEXT_PUBLIC_API_URL`).
        - [ ] Create an Axios interceptor to handle `401 Unauthorized` errors by triggering a global logout.

## Phase 3: Automation & Best Practices (Medium Priority)
This phase improves the development workflow and automates quality checks.

- [ ] **5. Enhance CI/CD Pipeline (`.github/workflows/ci.yml`)**
    - [ ] **Add Linting:** Add a CI step to run `npm run lint` and fail the build on errors.
    - [ ] **Add Dependency Security Scan:** Add a CI step to run `npm audit --audit-level=high` and fail the build on high-severity vulnerabilities.
    - [ ] **Review Secrets:** Ensure no secrets are hardcoded. All secrets must be loaded from environment variables, and the CI pipeline must use GitHub Actions secrets.

## Phase 4: Recommended Tooling & Libraries
This section provides recommendations for packages to implement fixes and adhere to best practices.

- [ ] **6. Backend Tooling**
    - [ ] **Security Headers:** Use `helmet` to set various HTTP headers for security.
        ```bash
        npm install helmet
        ```
    - [ ] **Data Validation:** Use `class-validator` and `class-transformer` for validating request DTOs.
        ```bash
        npm install class-validator class-transformer
        ```

- [ ] **7. Frontend Tooling**
    - [ ] **API Client:** Use `axios` for simplified HTTP requests and global error handling via interceptors.
        ```bash
        npm install axios
        ```
    - [ ] **Date Management:** Use `date-fns` or `day.js` for reliable date parsing, formatting, and manipulation.
        ```bash
        npm install date-fns
        ```

- [ ] **8. CI/CD & Security Services**
    - [ ] **Automated Vulnerability Scanning:**
        - [ ] **GitHub Dependabot:** Enable in repository settings ("Security & analysis") for automatic dependency alerts.
        - [ ] **Snyk:** Integrate into the repository to find and fix vulnerabilities in code and dependencies.

## Phase 5: Final Review & Verification
A final check to ensure all fixes are implemented correctly and are effective.

- [ ] **9. Conduct Post-Fix Verification**
    - [ ] Manually test all security fixes, including attempting to access protected API routes without authentication.
    - [ ] Use browser developer tools to confirm the JWT is stored in an `HttpOnly` cookie and not in `localStorage`.
    - [ ] Test the complete user flow: login, protected page access, and logout.
    - [ ] Confirm the CI/CD pipeline fails correctly on linting or security audit errors.