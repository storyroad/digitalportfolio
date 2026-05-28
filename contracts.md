# Backend & Frontend Integration Contracts

## Contact Form API

### POST /api/contact
**Purpose**: Submit a new contact form message

**Request Body**:
```json
{
  "name": "string",
  "email": "string (valid email)",
  "message": "string"
}
```

**Response**:
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "message": "string",
  "timestamp": "ISO datetime",
  "status": "new"
}
```

**Side Effects**:
- Saves submission to MongoDB `contact_submissions` collection
- Sends email notification to ketsiasln@gmail.com (if SMTP configured)

---

### GET /api/contact
**Purpose**: Retrieve all contact submissions (for admin dashboard)

**Response**: Array of contact submissions, sorted by timestamp (newest first)
```json
[
  {
    "id": "uuid",
    "name": "string",
    "email": "string",
    "message": "string",
    "timestamp": "ISO datetime",
    "status": "new|read|archived"
  }
]
```

---

### PATCH /api/contact/{submission_id}/status?status=<new|read|archived>
**Purpose**: Update the status of a submission

**Response**:
```json
{
  "success": true,
  "message": "Status updated"
}
```

---

### DELETE /api/contact/{submission_id}
**Purpose**: Delete a submission

**Response**:
```json
{
  "success": true,
  "message": "Submission deleted"
}
```

---

## Email Configuration

To enable email notifications, add these environment variables to `/app/backend/.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-gmail@gmail.com
SMTP_PASSWORD=your-app-password
FROM_EMAIL=noreply@commarkai.com
```

**Gmail App Password Setup**:
1. Go to https://myaccount.google.com/apppasswords
2. Generate a new app password for "Mail"
3. Use that password in SMTP_PASSWORD

---

## Frontend Integration

### Contact Form (Home.jsx)
- Uses `handleContactSubmit()` from `/utils/mock.js`
- Sends POST request to `/api/contact`
- Shows success/error toast
- Clears form on success

### Admin Dashboard (/admin)
- Fetches submissions with `getContactSubmissions()`
- Filter by status: all, new, read, archived
- Update status with `updateSubmissionStatus()`
- Delete submissions with `deleteSubmission()`
- Real-time stats display

---

## MongoDB Collections

### contact_submissions
```javascript
{
  id: String (UUID),
  name: String,
  email: String,
  message: String,
  timestamp: DateTime,
  status: String (enum: "new", "read", "archived")
}
```

---

## Routes

- `/` - Portfolio home page
- `/admin` - Admin dashboard for managing contact submissions
