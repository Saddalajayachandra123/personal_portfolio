# 🚀 Portfolio Backend API Documentation

## Quick Start

### Prerequisites
- Node.js 14+ installed
- npm or yarn package manager
- Gmail account (for email notifications)

### Installation Steps

```bash
# 1. Navigate to backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Copy environment template and configure
cp .env.example .env

# 4. Edit .env with your settings
# - Set EMAIL_USER and EMAIL_PASSWORD (Gmail app password)
# - Set PORT if needed
```

### Running the Backend

**Development Mode (with auto-reload)**
```bash
npm run dev
```

**Production Mode**
```bash
npm start
```

Server will start on `http://localhost:5000`

---

## 📡 API Endpoints

### Health Check
**GET** `/api/health`
- Returns server status
```json
{
  "status": "✅ API is running",
  "timestamp": "2024-02-XX...",
  "version": "1.0"
}
```

---

### Project Upload
**POST** `/api/upload-project`
- Upload project files
- **Content-Type:** multipart/form-data
- **Form Data:**
  - `files`: Multiple files (ZIP, RAR, PDF)
  - `projectName`: Project name (optional)
  - `uploadedBy`: Email address (optional)

**Request Example:**
```javascript
const formData = new FormData();
formData.append('files', fileInput.files[0]);
formData.append('projectName', 'Student Result Management System');
formData.append('uploadedBy', 'jaya@gmail.com');

fetch('/api/upload-project', {
  method: 'POST',
  body: formData
});
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Project uploaded successfully!",
  "data": {
    "projectName": "Student Result Management System",
    "fileCount": 3,
    "totalSize": "1.45 MB",
    "uploadDate": "2024-02-XX...",
    "uploadId": 1707123456789
  }
}
```

---

### Contact Form Submission
**POST** `/api/contact`
- Submit contact form message
- **Content-Type:** application/json

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'm interested in your work..."
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Message received! I will contact you soon.",
  "messageId": 1707123456789
}
```

---

### Get Upload History (Read-Only)
**GET** `/api/uploads`
- Retrieve all project uploads
- Returns array of upload records with file details

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1707123456789,
      "projectName": "Student Result Management System",
      "uploadedBy": "jaya@gmail.com",
      "uploadDate": "2024-02-XX...",
      "fileCount": 3,
      "totalSize": 1518345,
      "files": [...]
    }
  ],
  "count": 1
}
```

---

### Get Contact Messages (Read-Only)
**GET** `/api/contacts`
- Retrieve all contact messages received
- Returns array of contact records

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1707123456789,
      "name": "John Doe",
      "email": "john@example.com",
      "subject": "Project Inquiry",
      "message": "I'm interested...",
      "timestamp": "2024-02-XX...",
      "status": "received"
    }
  ],
  "count": 1
}
```

---

### Student Results Submission
**POST** `/api/results/submit`
- Submit student results

**Request Body:**
```json
{
  "studentName": "Rajesh Kumar",
  "studentId": "STU001",
  "subjects": [
    { "name": "Mathematics", "marks": 95 },
    { "name": "English", "marks": 87 },
    { "name": "Science", "marks": 92 }
  ],
  "totalMarks": 274
}
```

**Response:**
```json
{
  "success": true,
  "message": "Result submitted successfully",
  "resultId": 1707123456789
}
```

---

### Get Student Results
**GET** `/api/results/:studentId`
- Retrieve results for specific student

**Example:** `/api/results/STU001`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1707123456789,
    "studentName": "Rajesh Kumar",
    "studentId": "STU001",
    "subjects": [...],
    "totalMarks": 274,
    "submittedDate": "2024-02-XX..."
  }
}
```

---

## 🔧 Configuration Details

### Email Setup (Gmail)

1. **Enable 2-Step Verification:**
   - Go to https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Generate App Password:**
   - Visit https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer"
   - Copy the 16-character password

3. **Update .env file:**
   ```
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
   ```

### File Upload Limits
- **Maximum file size:** 100MB
- **Allowed formats:** ZIP, RAR, PDF, DOC
- **Storage location:** `./uploads/projects/`
- **Metadata storage:** `./uploads/uploads.json`

### Folder Structure
```
backend/
├── server.js                 # Original server
├── server-enhanced.js        # Enhanced server with full features
├── package.json
├── .env.example
├── BACKEND_API_DOCS.md       # This file
├── routes/
│   ├── auth.js
│   ├── contact.js
│   └── admin.js
├── models/
│   ├── User.js
│   └── Message.js
├── middleware/
│   └── auth.js
├── utils/
│   └── email.js
├── uploads/
│   ├── projects/            # Uploaded project files
│   ├── uploads.json         # Upload metadata
│   ├── contacts.json        # Contact messages
│   └── results.json         # Student results
└── public/                  # Static files (if any)
```

---

## 🔐 Security Notes

1. **Never commit .env file** to version control
2. **Use strong JWT_SECRET** in production
3. **Validate all file uploads** - only allow specific mime types
4. **Implement rate limiting** for production
5. **Use HTTPS** in production deployment
6. **Sanitize user inputs** to prevent injection attacks

---

## ⚠️ Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

Common HTTP Status Codes:
- **200:** Success
- **400:** Bad Request (missing fields, invalid data)
- **404:** Not Found
- **500:** Server Error

---

## 🚀 Deployment

### Deploy to Heroku

1. **Install Heroku CLI**
2. **Login:** `heroku login`
3. **Create app:** `heroku create your-app-name`
4. **Set environment variables:**
   ```bash
   heroku config:set EMAIL_USER=your_email@gmail.com
   heroku config:set EMAIL_PASSWORD=your_app_password
   ```
5. **Deploy:** `git push heroku main`

### Deploy to Vercel (with serverless functions)
Update `vercel.json` configuration for serverless deployment.

### Deploy Locally with PM2

```bash
npm install -g pm2
pm2 start server-enhanced.js --name "portfolio-backend"
pm2 save
pm2 startup
```

---

## 📝 Data Storage

All data is stored as JSON files in the `uploads/` directory:

- **uploads.json** - Project upload records
- **contacts.json** - Contact form submissions
- **results.json** - Student results
- **projects/** - Uploaded project files

### Backup Strategy
Regularly back up the `uploads/` directory to prevent data loss.

---

## 🐛 Troubleshooting

### Email not sending?
- Verify Gmail credentials in .env
- Check if 2-Step Verification is enabled
- Confirm App Password is correctly set
- Check email spam folder

### File upload fails?
- Verify file size is under 100MB
- Confirm file format is allowed (ZIP, RAR, PDF, DOC)
- Check `uploads/` directory exists with write permissions

### CORS errors?
- Add your frontend URL to `CORS_ORIGIN` in .env
- Example: `CORS_ORIGIN=http://localhost:3000,http://localhost:5500`

---

## 📞 Support

For issues or questions about the backend:
1. Check the error message in console
2. Review logs in `server-enhanced.js`
3. Verify environment configuration in `.env`
4. Test endpoints using Postman or curl

---

## 📋 Version History

**v1.0** (Current)
- Project upload with file handling
- Contact form with email notifications
- Student result management
- File metadata tracking
- Error handling and validation

---

**Last Updated:** February 2024