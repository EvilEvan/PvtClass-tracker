# Special Request Notes Feature

## Overview
The Special Request Notes feature allows moderators to send and receive important notifications that require acknowledgment. This system ensures critical information is communicated effectively across the moderator team.

## Features

### 1. Create Special Request Notes
- **Who can create**: Admins and Moderators
- **Priority levels**: HIGH, NORMAL, LOW
- **Character limits**: 
  - Title: 100 characters
  - Message: 1000 characters
- **Email notifications**: Automatically sent to all moderators
- **Real-time updates**: Dashboard refreshes automatically

### 2. Email Notifications
- **Automatic sending**: When a special request is created
- **Recipients**: All users with MODERATOR role
- **Content includes**:
  - Request title and priority
  - Full message content
  - Creator information
  - Timestamp
  - Link to moderator dashboard

### 3. Login Popup System
- **Auto-display**: Shows unacknowledged notes when moderators log in
- **Cannot be dismissed**: Until all notes are acknowledged
- **Visual indicators**: Priority-based color coding and icons
- **Batch acknowledgment**: Multiple notes can be acknowledged at once

### 4. Acknowledgment Tracking
- **Individual tracking**: Each moderator must acknowledge each note
- **Timestamp recording**: When each acknowledgment was made
- **Duplicate prevention**: Cannot acknowledge the same note twice
- **Statistics**: Dashboard shows acknowledgment counts

## Database Schema

### SpecialRequestNote Table
```sql
CREATE TABLE special_request_notes (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  priority TEXT DEFAULT 'NORMAL',
  created_by_id TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by_id) REFERENCES users(id)
);
```

### SpecialRequestAcknowledgment Table
```sql
CREATE TABLE special_request_acknowledgments (
  id TEXT PRIMARY KEY,
  note_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  read_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (note_id) REFERENCES special_request_notes(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id),
  UNIQUE(note_id, user_id)
);
```

## API Endpoints

### POST /api/messaging/special-requests
Create a new special request note
```json
{
  "title": "Urgent: System Maintenance",
  "message": "Database maintenance required this weekend...",
  "priority": "HIGH",
  "createdById": "user-id"
}
```

### GET /api/messaging/special-requests
Get all active special request notes

### GET /api/messaging/special-requests/unacknowledged?userId=xyz
Get unacknowledged notes for a specific user

### POST /api/messaging/special-requests/:noteId/acknowledge
Acknowledge a specific note
```json
{
  "userId": "user-id"
}
```

### PUT /api/messaging/special-requests/:noteId/deactivate
Deactivate a note (admin/creator only)
```json
{
  "userId": "user-id"
}
```

### GET /api/messaging/special-requests/stats
Get system statistics

## Frontend Components

### 1. SpecialRequestNotesModal
- **Purpose**: Display unacknowledged notes as popup
- **Features**:
  - Priority-based styling
  - Individual acknowledgment buttons
  - Cannot be closed until all acknowledged
  - Auto-shows on login if unacknowledged notes exist

### 2. CreateSpecialRequestModal
- **Purpose**: Create new special request notes
- **Features**:
  - Form validation
  - Character counters
  - Priority selection with descriptions
  - Real-time preview

### 3. ModeratorDashboard
- **Purpose**: Main interface for moderators
- **Features**:
  - Statistics cards
  - Recent notes list
  - Notification badges
  - Action buttons

## User Experience Flow

### Creating a Special Request
1. Moderator clicks "Create Special Request" button
2. Fills out form with title, message, and priority
3. Submits form
4. System creates note and sends emails to all moderators
5. Dashboard refreshes with new note

### Receiving and Acknowledging
1. Moderator receives email notification
2. Logs into system
3. Popup automatically appears if unacknowledged notes exist
4. Reviews each note
5. Clicks "Acknowledge" for each note
6. Popup closes when all acknowledged
7. Can view all notes anytime via "View Special Requests" button

## Priority System

### HIGH Priority (🚨)
- **Color**: Red background
- **Use case**: Urgent issues requiring immediate attention
- **Examples**: System outages, security issues, emergency procedures

### NORMAL Priority (📋)
- **Color**: Blue background
- **Use case**: Standard operational communications
- **Examples**: Policy updates, meeting announcements, routine changes

### LOW Priority (📝)
- **Color**: Green background
- **Use case**: Informational updates that can wait
- **Examples**: Newsletter items, optional training, general announcements

## Security Considerations

### Access Control
- Only MODERATOR and ADMIN roles can create/view special requests
- Users can only acknowledge notes for themselves
- Only creators and ADMINs can deactivate notes

### Data Validation
- Input sanitization on all text fields
- SQL injection prevention via Prisma ORM
- XSS protection through React's built-in escaping

### Email Security
- Email addresses validated before sending
- Rate limiting to prevent spam
- Secure email templates

## Installation Steps

### 1. Database Migration
```bash
cd backend
npx prisma migrate dev --name add-special-request-notes
npx prisma generate
```

### 2. Backend Setup
- MessagingService created in `backend/src/messaging/`
- MessagingController handles HTTP requests
- MessagingModule registered in AppModule

### 3. Frontend Components
- Components created in `frontend/src/components/`
- ModeratorDashboard updated with new functionality
- TypeScript interfaces defined

### 4. Testing
- Test creating special requests
- Verify email notifications (check console logs)
- Test acknowledgment flow
- Verify popup behavior on login

## Configuration

### Email Settings
Currently using console logging for email notifications. To enable real email:

1. Install email service (e.g., nodemailer)
2. Configure SMTP settings
3. Update `sendSpecialRequestEmailNotifications` method
4. Add email templates

### Environment Variables
```env
EMAIL_SERVICE_PROVIDER=sendgrid
EMAIL_API_KEY=your-api-key
EMAIL_FROM_ADDRESS=noreply@yourschool.com
```

## Monitoring and Analytics

### Dashboard Statistics
- Total active notes
- High priority notes count
- Total moderators
- Total acknowledgments

### Logging
- All special request creations logged
- Acknowledgment actions logged
- Email sending attempts logged
- Error handling with detailed logging

## Future Enhancements

### Planned Features
1. **Email Templates**: Rich HTML email templates
2. **Push Notifications**: Browser push notifications
3. **Scheduled Notes**: Ability to schedule notes for future delivery
4. **Note Categories**: Categorization system for better organization
5. **Bulk Operations**: Bulk acknowledge, bulk deactivate
6. **Note Expiration**: Auto-deactivate notes after certain time
7. **Read Receipts**: Enhanced tracking of when notes are read
8. **File Attachments**: Ability to attach files to notes

### Technical Improvements
1. **Real Email Integration**: Production-ready email service
2. **WebSocket Support**: Real-time updates without page refresh
3. **Mobile App**: Native mobile app support
4. **API Rate Limiting**: Enhanced security measures
5. **Audit Trail**: Complete audit log of all actions
6. **Backup System**: Regular backups of important notes

## Troubleshooting

### Common Issues

#### Notes not showing up
- Check if user has MODERATOR role
- Verify database connection
- Check console for API errors

#### Email notifications not working
- Currently using console logging (development mode)
- Check server console for email simulation logs
- Verify moderator email addresses in database

#### Popup not appearing
- Check if there are actually unacknowledged notes
- Verify user ID is correct
- Check browser console for JavaScript errors

#### Cannot acknowledge notes
- Verify user permissions
- Check API endpoint accessibility
- Ensure note ID is valid

### Support
For technical support or feature requests, contact the development team or create an issue in the project repository. 