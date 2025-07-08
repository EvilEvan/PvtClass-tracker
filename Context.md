# Project Context: Private Class Tracker

## 🚀 Core Mission

To develop a professional, secure, and highly efficient management platform for private tutoring operations. This application is designed with a clear, role-based architecture to serve the distinct needs of Administrators, Moderators, and Teachers, ensuring a seamless workflow for student and session management.

---

## 🎯 Current Vision & Strategy

The platform is evolving from a local-only prototype into a production-ready, cloud-deployable application. The immediate focus is on overhauling the user authentication experience to be more intuitive, secure, and professional.

### Key Strategic Pillars:

1.  **Role-Based Entry Point**:
    *   **Problem**: The current application either forces an admin setup (or a generic login, which is not intuitive for different user roles.) < please clarify where I said "or"?> -1 respect.
    *   **Solution**: A new **role-selection screen** will serve as the primary entry point. Users will first identify their role (Moderator, Teacher, or *Admin*?) <-1 Respect (- Bottom of the screen in half the font size named "Evan" (This is my developer/admin platform that can add and run everything)> before proceeding to a tailored login page. This creates a clear, guided path for every user.

2.  **Enhanced Security & User Onboarding**:
    *   **Problem**: New users are given credentials but have no process to set their own secure password.
    *   **Solution**: A **forced password change** mechanism will be implemented for all new users. Upon their first login, they will be required to change their temporary password via a modal, enhancing account security from day one.

3.  **Scalable & Maintainable Architecture**:
    *   **Problem**: As the application grows, a clean and logical file structure is critical to avoid technical debt.
    *   **Solution**: The project structure has been refined to clearly separate concerns. Frontend components are organized by feature (e.g., `auth`, `layout`), and backend modules are distinctly defined. This "Structure as Documentation" approach makes the codebase easier to navigate, maintain, and scale. See `Structure.md` for the detailed layout.

4.  **Cloud-Ready Configuration**:
    *   **Problem**: Hardcoded `localhost` URLs and development-specific settings prevent easy deployment.
    *   **Solution**: The codebase has been refactored to use environment variables (`.env`) for all external URLs and sensitive configurations. This allows for seamless switching between local development and a live production environment on platforms like Vercel and Render.

---

## 🛠️ Current Development State

The application is in a transitional phase, moving from feature implementation to architectural refinement and user experience enhancement.

### Completed Milestones:
-   **Core Features**: Robust systems for managing Students, Sessions, and Classrooms are in place, all integrated with a Prisma-managed database.
-   **Real-Time Capabilities**: A WebSocket gateway (`AppGateway`) provides live updates for key events across the platform.
-   **Dynamic Branding**: An administration system allows for the dynamic configuration of the school's name.
-   **Deployment Prep**: The codebase has been refactored to be cloud-ready.

### Immediate Work-in-Progress (See `docs/job-card.md`):
-   **Implementing the New Authentication Flow**:
    1.  **Backend**: Adding the necessary `passwordChanged` flag to the database and building the secure password-change endpoint.
    2.  **Frontend**: Creating the new role-selection and unified login pages.
    3.  **Frontend**: Building the reusable modals for forced password changes and user notifications.

This strategic shift ensures that as we add more features, they are built upon a solid, secure, and professional foundation that is ready for real-world use. 