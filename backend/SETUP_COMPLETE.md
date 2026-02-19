# Backend Setup Summary

## ✅ What I've Created for You

A complete **Node.js + Express backend** for your portfolio with the following features:

### 🔐 Authentication System
- User registration with validation
- Secure login with JWT tokens
- Password hashing with bcryptjs
- Role-based access control (User & Admin)
- Protected admin routes

### 📧 Contact Form System
- Contact form API endpoint
- Email validation using Joi
- Automatic emails to admin and visitor
- Message storage in MongoDB
- Message status tracking

### 👨‍💼 Admin Dashboard Backend
- View all contact messages
- Filter messages by status
- Pagination support
- Update message status (new → read → replied)
- Delete messages
- Dashboard statistics

### 📨 Email Service
- Beautiful HTML email templates
- Sends to both admin and visitor
- Gmail SMTP integration
- Error handling and logging

## 📁 Directory Structure Created

```
portfolio/
├── backend/
    ├── models/
    │   ├── User.js              # User database model
    │   └── Message.js           # Contact message model
    ├── routes/
    │   ├── auth.js              # Login/Register endpoints
    │   ├── contact.js           # Contact form endpoints
    │   └── admin.js             # Admin panel endpoints
    ├── middleware/
    │   └── auth.js              # JWT authentication
    ├── utils/
    │   └── email.js             # Email sending service
    ├── server.js                # Main server file
    ├── package.json             # Dependencies list
    ├── .env                     # Configuration (KEEP SECRET!)
    ├── .env.example             # Configuration template
    ├── .gitignore               # Git ignore rules
    ├── README.md                # Full documentation
    └── QUICKSTART.md            # Quick setup guide
```

## 🚀 Quick Start (3 Steps)

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Configure .env
Edit `backend/.env` with:
- MongoDB connection string
- Gmail credentials
- Optional: Change JWT_SECRET

### Step 3: Start Server
```bash
npm run dev
```

Server runs on: **http://localhost:5000**

## 📡 API Endpoints Available

### Authentication (`/api/auth`)
- `POST /register` - Create new user account
- `POST /login` - Get JWT token
- `GET /me` - Get current user (protected)

### Contact Form (`/api/contact`)
- `POST /submit` - Submit contact form
- `GET /stats` - Get message statistics
- `GET /messages` - Get recent messages

### Admin Panel (`/api/admin`) - Admin Only
- `GET /messages` - View all messages (paginated)
- `GET /messages/:id` - View single message
- `PUT /messages/:id` - Update message status
- `DELETE /messages/:id` - Delete message
- `GET /dashboard` - Dashboard statistics

## 🔧 Configuration Needed

### 1. MongoDB
**Option A: Local**
```
MONGODB_URI=mongodb://localhost:27017/portfolio
```

**Option B: Atlas (Cloud) - Recommended**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

### 2. Gmail Setup
1. Go to: https://myaccount.google.com/apppasswords
2. Select Mail + Windows Computer
3. Copy 16-character password
4. In .env:
   ```
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=copied_16_char_password
   EMAIL_ADMIN=your_email@gmail.com
   ```

### 3. JWT Secret
Generate a secure random string and set:
```
JWT_SECRET=your_very_long_random_secret_string_here
```

## 🔌 Frontend Integration

To connect your portfolio frontend to this backend:

```javascript
// Example: Submit contact form
async function submitContact(formData) {
  const response = await fetch('http://localhost:5000/api/contact/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  return await response.json();
}

// Example: Login (for admin dashboard)
async function loginAdmin(email, password) {
  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  localStorage.setItem('token', data.token); // Save token for future requests
  return data;
}

// Example: Get dashboard (needs token)
async function getDashboard(token) {
  const response = await fetch('http://localhost:5000/api/admin/dashboard', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
}
```

## 📚 Documentation Files

- **README.md** - Complete API documentation
- **QUICKSTART.md** - Setup wizard
- **.env.example** - Configuration template

## ✨ Features

✅ Production-ready code
✅ Error handling & validation
✅ Security best practices (password hashing, JWT)
✅ Email notifications
✅ Database persistence
✅ Admin authentication
✅ CORS enabled
✅ Comprehensive logging
✅ Scalable architecture

## 🆘 Common Issues & Solutions

**MongoDB not connecting?**
- Ensure MongoDB is running
- Check MONGODB_URI syntax
- Use MongoDB Atlas for cloud option

**Emails not sending?**
- Use app-specific password (not regular password)
- Enable "Less secure apps" if needed
- Verify EMAIL_USER matches Gmail account

**CORS errors on frontend?**
- Update CORS_ORIGIN in .env
- Restart the server
- Clear browser cache

## 🌐 Deployment Ready

This backend can be deployed to:
- **Heroku** (free tier available)
- **Railway** (modern alternative)
- **Render** (easy deployment)
- **AWS**, **GCP**, **Azure** (paid options)

## 📋 Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Configure .env with MongoDB & Gmail
3. ✅ Start server: `npm run dev`
4. Connect your portfolio frontend to these endpoints
5. Create admin dashboard UI (optional)
6. Deploy to production

## 💻 All npm Scripts

```bash
npm start          # Run production server
npm run dev        # Run with auto-reload
npm install        # Install dependencies
```

## 🎯 Key Files to Understand

- **server.js** - Entry point, sets up Express app
- **models/User.js** - User authentication data
- **models/Message.js** - Contact message storage
- **routes/auth.js** - Login/Register logic
- **routes/contact.js** - Contact form handling
- **middleware/auth.js** - JWT verification
- **utils/email.js** - Email service

## 🔐 Security Notes

✅ Passwords are hashed (never stored in plain text)
✅ JWTs expire after 7 days
✅ Admin routes require authentication
✅ Input validation on all endpoints
✅ CORS protection enabled
✅ Environment variables for secrets

**Important:** Never commit the `.env` file - it contains sensitive data!

---

**Your backend is now ready to use!** 🎉

Start with the QUICKSTART.md file for step-by-step setup instructions.
