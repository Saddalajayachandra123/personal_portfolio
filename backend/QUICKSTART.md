# Backend Quick Start Guide

## 📋 Step-by-Step Setup

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: MongoDB Setup

**Option A: Local MongoDB**
1. Download MongoDB from https://www.mongodb.com/try/download/community
2. Install and start MongoDB
3. In `.env`, use: `MONGODB_URI=mongodb://localhost:27017/portfolio`

**Option B: MongoDB Atlas (Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Click "Connect" → "Connect to your application"
5. Copy connection string
6. Replace `<password>` and `<dbname>` with your details
7. Paste in `.env` as `MONGODB_URI`

### Step 3: Gmail Setup for Email

1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer"
3. Copy the 16-character password
4. In `.env`:
   - `EMAIL_USER=your_email@gmail.com`
   - `EMAIL_PASSWORD=the_16_char_password`
   - `EMAIL_ADMIN=your_email@gmail.com`

### Step 4: Configure .env File

Copy `.env.example` to `.env` and update:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=generate_a_long_random_string_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_ADMIN=your_email@gmail.com
CORS_ORIGIN=http://localhost:3000
```

### Step 5: Start the Server

**Development** (with auto-reload):
```bash
npm run dev
```

**Production**:
```bash
npm start
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on http://localhost:5000
```

## 🧪 Testing the API

### 1. Health Check
```bash
curl http://localhost:5000/api/health
```

### 2. Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "jayachandra",
    "email": "jaya@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

### 3. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jaya@example.com",
    "password": "password123"
  }'
```

Response will include a `token` - save this for admin requests!

### 4. Submit Contact Form
```bash
curl -X POST http://localhost:5000/api/contact/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "subject": "Inquiry",
    "message": "I want to hire you for a project"
  }'
```

### 5. Get Admin Dashboard (use your token)
```bash
curl -X GET http://localhost:5000/api/admin/dashboard \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🔗 Connecting Frontend to Backend

In your HTML contact form or JavaScript:

```javascript
// Handle contact form submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value
  };
  
  try {
    const response = await fetch('http://localhost:5000/api/contact/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    const data = await response.json();
    if (data.success) {
      alert('Message sent successfully!');
      contactForm.reset();
    } else {
      alert('Error: ' + data.message);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to send message');
  }
});
```

## 📁 Project Structure

```
backend/
├── models/              # Database schemas
│   ├── User.js
│   └── Message.js
├── routes/              # API endpoints
│   ├── auth.js         # Login, Register
│   ├── contact.js      # Contact form
│   └── admin.js        # Admin panel
├── middleware/          # Authentication
│   └── auth.js
├── utils/               # Helper functions
│   └── email.js        # Email sending
├── server.js           # Main application
├── package.json        # Dependencies
├── .env                # Environment variables (Don't commit!)
├── .env.example        # Template for .env
└── README.md           # Full documentation
```

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Change `NODE_ENV` to `production`
- [ ] Use strong `JWT_SECRET` (generate random string)
- [ ] Set up MongoDB Atlas
- [ ] Configure Gmail app password
- [ ] Update `CORS_ORIGIN` to your frontend domain
- [ ] Test all API endpoints
- [ ] Set up environment variables on hosting platform
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Set up error logging
- [ ] Backup database

## 🆘 Troubleshooting

**"Cannot connect to MongoDB"**
- Check MongoDB is running
- Verify MONGODB_URI in .env
- Check connection string syntax

**"Email not sending"**
- Verify Gmail app password (not regular password)
- Check EMAIL_USER and EMAIL_PASSWORD
- Go to myaccount.google.com/apppasswords again

**"CORS error on frontend"**
- Update CORS_ORIGIN in .env to match frontend URL
- Restart the server
- Clear browser cache

**"Port 5000 already in use"**
- Change PORT in .env to 5001
- Or kill the process: `lsof -ti:5000 | xargs kill -9`

## 📞 API Reference

All responses follow this format:

**Success:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description"
}
```

## 💡 Next Steps

1. ✅ Set up backend
2. Update frontend to call these API endpoints
3. Create an admin dashboard UI
4. Deploy backend to production
5. Set up CI/CD pipeline

Need help? Check the full README.md file!
