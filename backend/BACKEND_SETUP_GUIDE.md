# 🚀 Portfolio Backend Setup & Deployment Guide

## 📋 Overview

Your portfolio now has a complete Node.js/Express backend with:
- ✅ Project file uploads (from Student Result Management System)
- ✅ Contact form email notifications
- ✅ Student result management
- ✅ Upload history tracking
- ✅ Email service integration (Gmail)

---

## ⚡ Quick Start (5 Minutes)

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

### Step 2: Configure Environment

1. Copy environment template:
```bash
copy .env.example .env
```

2. Edit `.env` file:
```
PORT=5000
NODE_ENV=development
EMAIL_USER=jaya@gmail.com
EMAIL_PASSWORD=your_16_char_app_password
```

### Step 3: Setup Gmail App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (if not already enabled)
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Select "Mail" and "Windows Computer"
5. Copy the 16-character password
6. Paste in `.env` as `EMAIL_PASSWORD`

### Step 4: Run Backend Server

**Development Mode** (with auto-reload):
```bash
npm run dev
```

**Production Mode**:
```bash
npm start
```

You should see:
```
========================================
🚀 Portfolio Backend Server Running
========================================
📡 Server: http://localhost:5000
🔗 API Health: http://localhost:5000/api/health
📁 Uploads: C:\...\Portfolio\backend\uploads
========================================
```

### Step 5: Test the Backend

Open browser and visit:
- Health Check: http://localhost:5000/api/health
- Upload History: http://localhost:5000/api/uploads
- Contact Messages: http://localhost:5000/api/contacts

---

## 🔗 Frontend Integration

The frontend (`index.html` + `script.js`) is already configured to:

1. **Upload Project Files**
   - File input detects folder/files
   - Sends to backend `/api/upload-project`
   - Shows success modal with details

2. **Contact Form** (when added)
   - Submits to `/api/contact`
   - Backend sends confirmation emails
   - Message stored in `uploads/contacts.json`

### Testing Frontend → Backend

1. Start backend: `npm run dev` (in `backend/` folder)
2. Keep backend running
3. Open `index.html` in browser
4. Go to "Student Result Management System" project
5. Click "Upload Project" button
6. Select files/folders
7. See success confirmation

---

## 📂 Project Structure

```
backend/
├── server.js                 # Original server (reference)
├── server-enhanced.js        # ⭐ Main enhanced server with all features
├── package.json              # Dependencies
├── .env.example              # Configuration template
├── .env                      # ⚙️ Your local configuration (PRIVATE)
├── BACKEND_API_DOCS.md       # API documentation
├── SETUP_COMPLETE.md         # (existing)
├── README.md                 # (existing)
│
├── routes/
│   ├── auth.js              # Authentication routes (optional)
│   ├── contact.js           # Contact routes
│   └── admin.js             # Admin routes
│
├── models/
│   ├── index.js             # MongoDB schemas (optional)
│   ├── User.js              # (existing)
│   └── Message.js           # (existing)
│
├── middleware/
│   └── auth.js              # Auth middleware
│
├── utils/
│   └── email.js             # Email utilities
│
├── uploads/                 # 📁 Generated on first run
│   ├── projects/            # Uploaded project files
│   ├── uploads.json         # Upload records metadata
│   ├── contacts.json        # Contact messages
│   └── results.json         # Student results
│
└── public/                  # Static files (if any)
```

---

## 🔑 Key Features Implemented

### 1. Project Upload (`POST /api/upload-project`)
- Accept multiple files at once
- Support folder uploads (via `webkitdirectory`)
- Store files in `uploads/projects/`
- Record metadata in `uploads/uploads.json`
- Send confirmation email
- Return success with upload details

**Frontend Integration:**
```javascript
// Automatically triggered when user selects files
const fileInputs = document.querySelectorAll('.file-input');
fileInputs.forEach(input => {
    input.addEventListener('change', async (e) => {
        const formData = new FormData();
        // Add files + metadata
        fetch(`${API_BASE_URL}/api/upload-project`, {
            method: 'POST',
            body: formData
        });
    });
});
```

### 2. Contact Form (`POST /api/contact`)
- Accept name, email, subject, message
- Save to `uploads/contacts.json`
- Send admin notification to `jaya@gmail.com`
- Send user confirmation email
- Track message status

**Expected Frontend HTML:**
```html
<form name="contact">
  <input name="name" placeholder="Your Name" required>
  <input name="email" type="email" placeholder="Your Email" required>
  <input name="subject" placeholder="Subject" required>
  <textarea name="message" placeholder="Message" required></textarea>
  <button type="submit">Send</button>
</form>
```

### 3. Student Results (`POST /api/results/submit`)
- Submit student name, ID, subjects/marks
- Calculate percentage and grade
- Store in `uploads/results.json`
- Query by student ID (`GET /api/results/:studentId`)

### 4. Admin Endpoints (Read-Only)
- `GET /api/uploads` - All project uploads
- `GET /api/contacts` - All contact messages
- `GET /api/results/:studentId` - Specific student result

---

## 🛡️ Important Security Notes

### Before Production Deployment:

1. **Never commit .env file**
   - Add to `.gitignore`:
   ```
   .env
   uploads/
   uploads/
   ```

2. **Use strong JWT_SECRET** in production
   ```bash
   # Generate strong secret
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. **Environment Variables** must be set:
   - Don't use hardcoded credentials
   - Use system environment or PM2 ecosystem.config.js

4. **SQL Injection Prevention**
   - Already handled (using JSON, not SQL)
   - If adding MongoDB later, use Mongoose schema validation

5. **CORS Configuration**
   - Edit `.env` CORS_ORIGIN for production:
   ```
   CORS_ORIGIN=https://yourportfolio.com,https://www.yourportfolio.com
   ```

6. **File Upload Validation**
   - Limited to 100MB per file
   - Only ZIP, RAR, PDF, DOC formats allowed
   - Implemented in multer config

---

## 📧 Email Configuration Details

### Gmail Setup

**For Gmail**:
1. Personal account: Use [App Passwords](https://myaccount.google.com/apppasswords)
2. Workspace/Organization: Use your email password directly (if admin allows)

**For Other Email Services**:
Update `.env`:
```
EMAIL_SERVICE=outlook         # or yahoo, aol, etc.
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
```

### Email Templates

Currently sending:
1. **Upload Confirmation** (to uploader)
2. **Admin Alert** (to jaya@gmail.com)
3. **Contact Form Confirmation** (to sender)
4. **Admin Notification** (to jaya@gmail.com)

---

## 🚀 Deployment Options

### Option 1: Local Development
```bash
cd backend
npm run dev
```
- Server runs on `http://localhost:5000`
- Auto-reloads on file changes
- Requires terminal window

### Option 2: Local Production (PM2)
```bash
# Install PM2 globally
npm install -g pm2

# Start server
pm2 start server-enhanced.js --name "portfolio-api"

# Make it restart on system reboot
pm2 startup
pm2 save
```

### Option 3: Railway.app Deployment

1. **Push code to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

2. **Deploy on Railway**
   - Go to railway.app
   - Connect GitHub repo
   - Add project
   - Railway auto-detects Node.js
   - Set environment variables in Railway dashboard
   - Deploy

3. **Set GitHub Secrets** (for CI/CD)
```
RAILWAY_TOKEN=your_token
```

### Option 4: Heroku Deployment

```bash
# Install Heroku CLI
# Go to heroku.com, create account

# Login
heroku login

# Create app
heroku create your-app-name

# Add environment variables
heroku config:set EMAIL_USER=jaya@gmail.com
heroku config:set EMAIL_PASSWORD=your_app_password
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Option 5: Docker Deployment

Create `backend/Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t portfolio-api .
docker run -p 5000:5000 \
  -e EMAIL_USER=jaya@gmail.com \
  -e EMAIL_PASSWORD=xxxx_xxxx_xxxx_xxxx \
  portfolio-api
```

---

## 🧪 API Testing

### Using curl

```bash
# Test health
curl http://localhost:5000/api/health

# Get uploads
curl http://localhost:5000/api/uploads

# Get contacts
curl http://localhost:5000/api/contacts

# Submit contact (POST)
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "email": "john@example.com",
    "subject": "Hi",
    "message": "Great portfolio!"
  }'
```

### Using Postman

1. Create new request
2. URL: `http://localhost:5000/api/upload-project`
3. Method: POST
4. Body → form-data
5. Add files key + select files
6. Send

### Using Frontend

Just use the upload button in portfolio!

---

## 🐛 Troubleshooting

### Backend not starting?

**Error: "Port already in use"**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process (Windows)
taskkill /PID <PID> /F

# OR use different port
set PORT=5001 && npm run dev
```

**Error: "MODULE NOT FOUND"**
```bash
# Reinstall dependencies
rm -r node_modules package-lock.json
npm install
```

### Email not sending?

1. Check `.env` has correct credentials
2. Verify 2-Step Verification enabled in Gmail
3. Check [Gmail App Passwords page](https://myaccount.google.com/apppasswords)
4. Check spam folder for test emails
5. Look at server console for error details

### Uploads not showing?

1. Confirm `uploads/` folder exists
2. Check file permissions on `uploads/` directory
3. Verify files were actually uploaded (check in explorer)
4. Check `uploads/uploads.json` for metadata

### CORS errors?

Update `.env`:
```
CORS_ORIGIN=http://localhost:3000,http://localhost:5500,http://localhost:8000
```

---

## 📊 Monitoring & Maintenance

### View Upload History

Open file: `backend/uploads/uploads.json`

Example:
```json
{
  "id": 1707123456789,
  "projectName": "Student Result Management System",
  "uploadedBy": "jaya@gmail.com",
  "fileCount": 3,
  "totalSize": 1518345,
  "uploadDate": "2024-02-XX..."
}
```

### Backup Data

Regularly backup `backend/uploads/` directory:
```bash
# Windows PowerShell
Copy-Item -Path "uploads" -Destination "uploads_backup_$(Get-Date -Format 'yyyy-MM-dd')" -Recurse
```

### Clear Old Uploads

```bash
# Keep only recent uploads (optional)
# Manually edit uploads.json to remove old records
```

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com)
- [Multer File Upload](https://github.com/expressjs/multer)
- [Nodemailer Documentation](https://nodemailer.com)
- [CORS Middleware](https://github.com/expressjs/cors)
- [Environment Variables (dotenv)](https://github.com/motdotla/dotenv)

---

## ✅ Checklist Before Going Live

- [ ] `.env` configured with correct email credentials
- [ ] Gmail 2-Step Verification enabled
- [ ] App Password generated and stored
- [ ] Backend starts without errors (`npm run dev`)
- [ ] API health check returns 200 status
- [ ] Frontend can upload files successfully
- [ ] Contact form sends emails
- [ ] Uploads saved to `uploads/` directory
- [ ] `.env` added to `.gitignore`
- [ ] `uploads/` added to `.gitignore`
- [ ] Backup strategy in place

---

## 🎯 Next Steps

1. **Start the backend:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Test locally:**
   - Open `index.html` in browser
   - Try uploading project files
   - Check success modal

3. **Deploy when ready:**
   - Choose deployment option above
   - Set environment variables
   - Monitor logs and errors

4. **Monitor usage:**
   - Check `uploads/uploads.json` for upload history
   - Check `uploads/contacts.json` for messages
   - Set up email forwarding if needed

---

**Last Updated:** February 2024  
**Backend Version:** 1.0  
**Status:** ✅ Production Ready

Need help? Check[BACKEND_API_DOCS.md](BACKEND_API_DOCS.md) for detailed API reference.