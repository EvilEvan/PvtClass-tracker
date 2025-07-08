# SANGSOM Kindergarten - Account Management System

## System Overview

The SANGSOM Kindergarten platform implements a role-based access control system with a professional, appealing interface featuring a pulsating gold-to-yellow animated title.

## 1. Startup/Login Interface

### Design Requirements
- **Title**: "SANGSOM Kindergarten" 
- **Style**: Professional and appealing design with pulsating animation (gold to yellow gradient)
- **Login Fields**: Only email and password initially
- **Authentication**: Username/email and password verification

### Login Flow
1. User enters email and password on the startup screen
2. System validates credentials against the database
3. Upon successful login, user is redirected to role-appropriate dashboard
4. Failed login displays error message

## 2. Account Creation & Management

### Administrator Privileges (Developer Level)
**Role**: ADMIN

**Can Create All Account Types:**
- ✅ Administrator accounts
- ✅ Moderator accounts  
- ✅ Teacher accounts
- ✅ Student accounts

**Account Creation Access:**
- Available only after successful administrator login
- Accessed through User Management dashboard section
- Full CRUD operations on all user accounts

### Moderator Privileges
**Role**: MODERATOR

**Study Location Management:**
- ✅ Can assign "Study Location" to other user profiles
- ✅ Can edit "Study Location" of existing profiles
- ✅ Can add and edit Teacher profiles
- ✅ Can add and edit Student profiles

**Restrictions:**
- ❌ Cannot create Administrator accounts
- ❌ Cannot delete Administrator accounts

### Teacher Account Privileges
**Role**: TEACHER

**Limited Access:**
- ✅ Can view already added student accounts
- ✅ Can edit student "Study Location" assignments
- ✅ Can update student profile information (limited fields)
- ✅ Access to Teacher Dashboard for session management

**Restrictions:**
- ❌ Cannot create new accounts
- ❌ Cannot delete accounts
- ❌ Cannot access administrative functions

### Student Accounts
**Role**: STUDENT

**No User Functions:**
- ❌ No login capabilities
- ❌ No dashboard access
- ❌ No account management functions

**Purpose:**
- 📊 Data storage only
- 📋 Profile information management by staff
- 🏫 Study location assignments
- 📚 Class assignment tracking

## 3. Account Features & Fields

### Core User Fields
- **Email**: Unique identifier and login username
- **Name**: Full name display
- **Role**: ADMIN | MODERATOR | TEACHER | STUDENT
- **Password**: Encrypted authentication (not required for students)
- **Study Location**: Assignable by Moderator/Admin

### Study Location Management
- **Assigned By**: Moderators and Administrators only
- **Editable By**: Moderators, Administrators, and Teachers (limited)
- **Purpose**: Track and organize student/staff locations
- **Field Type**: Text/dropdown selection

### Email Constraints
- Maximum 2 accounts per email address
- Cannot have duplicate roles for same email
- Unique email validation required

## 4. Role-Based Dashboard Access

### Administrator Dashboard
- User Management (create/edit/delete all account types)
- Student Management
- Session Management  
- Classroom Management
- System Configuration
- Analytics and Reporting

### Moderator Dashboard
- User Management (Teachers and Students only)
- Study Location Assignment
- Student Management
- Session Management
- Classroom Management

### Teacher Dashboard
- Student Viewing (read-only profile data)
- Study Location Editing (students only)
- Session Management (own sessions)
- Student Progress Tracking

### Student Dashboard
- No dashboard access (accounts are data-only)

## 5. Security & Permissions

### Authentication Rules
- Strong password requirements for staff accounts
- Session management and timeout
- Role-based route protection
- Master password override for emergency access

### Permission Matrix
| Action | Admin | Moderator | Teacher | Student |
|--------|-------|-----------|---------|---------|
| Create Admin | ✅ | ❌ | ❌ | ❌ |
| Create Moderator | ✅ | ❌ | ❌ | ❌ |
| Create Teacher | ✅ | ✅ | ❌ | ❌ |
| Create Student | ✅ | ✅ | ❌ | ❌ |
| Edit Study Location | ✅ | ✅ | ✅* | ❌ |
| View Students | ✅ | ✅ | ✅ | ❌ |
| Delete Users | ✅ | ✅** | ❌ | ❌ |
| System Config | ✅ | ❌ | ❌ | ❌ |

*Teachers can only edit student study locations
**Moderators cannot delete Admin accounts

## 6. Implementation Notes

### Database Schema
- Users table with role-based fields
- Students table with extended profile information
- Study location field in both User and Student models
- Proper foreign key relationships

### Programming Rulesets
- Role-based middleware for API endpoints
- Frontend route guards based on user role
- Input validation for all user creation forms
- Audit logging for account modifications

### Integration Points
- Authentication service integration
- Role-based component rendering
- Permission checking across all modules
- Session management and security

## 7. Future Enhancements

- Two-factor authentication for administrative accounts
- Bulk user import/export functionality
- Advanced study location management with mapping
- Automated account provisioning workflows
- Enhanced audit trails and reporting

---

**Developer Note**: Administrator = Developer access level with full system control and override capabilities. 