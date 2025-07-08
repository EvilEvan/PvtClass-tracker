Pre-Test Checklist
1. Authentication & Security Flow
This is the most critical area due to the recent security enhancements.
[ ] Test First-Time Login:
Action: Log in as a newly created Teacher.
Expected: You should be immediately forced to open the PasswordChangeModal. You should not be able to access the dashboard before changing the password.
Why: Verifies the passwordChanged: false flag correctly triggers the mandatory security flow.
[ ] Test Password Strength & Validation:
Action: In the modal, test various passwords (weak, strong, non-matching).
Expected: The UI should provide real-time feedback on strength and prevent submission of weak or non-matching passwords. The "Update Password" button should be disabled.
Why: Ensures the client-side validation and security rules are enforced.
[ ] Test Successful Password Change:
Action: Complete the password change process for the new teacher.
Expected: The modal should close, and you should be automatically redirected to the teacher-dashboard.
Why: Confirms the end-to-end flow, including state updates and redirection, is working correctly.
[ ] Test Standard Login:
Action: Log out and log back in with the new password.
Expected: You should be taken directly to the dashboard without the password change modal appearing.
Why: Verifies that the passwordChanged: true flag is set correctly in the database and the system recognizes the user.
[ ] Test Admin Login:
Action: Log in as the Admin user (Evan).
Expected: Direct access to the main dashboard.
Why: Confirms the special case for the hardcoded admin account still works.
2. Admin Settings & Branding
This verifies the system-wide configuration capabilities.
[ ] Access Admin Settings:
Action: As the Admin, navigate to the admin-settings page.
Expected: The page should load correctly, displaying system info and the branding update form.
Why: Ensures role-based access to administrative functions is working.
[ ] Test School Name Update:
Action: Try to update the school name with the wrong password, then with the correct one (Snotneus).
Expected: The update should fail with an error for the wrong password and succeed with the correct one. Upon success, the school name should update across the entire UI (e.g., in the header, login page) after a refresh.
Why: Verifies the password-protected admin actions and the useSchoolBranding hook's functionality.
3. Real-Time Notifications & WebSockets
This ensures the live-update functionality is operational.
[ ] Test Connection Status:
Action: While logged in, check for the WebSocket connection indicator in the header.
Expected: It should show a "connected" status (typically green).
Why: Confirms the initial WebSocket connection is established on login.
[ ] Test Live Student Updates:
Action: Open two browser windows logged in as the Moderator. In one window, create, update, or delete a student.
Expected: The student list in the second window should update automatically without a page refresh. A toast notification should appear for each action.
Why: This is the core test for the real-time infrastructure, confirming that backend events are broadcasted and handled by the frontend correctly.
Completing this checklist will validate the most important and recently modified parts of the application, giving you high confidence before proceeding with a full, overall system test.