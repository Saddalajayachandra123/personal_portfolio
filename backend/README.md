# Portfolio Backend API

Complete Node.js + Express backend for Jaya Chandra's Portfolio with authentication, contact form, and admin dashboard.

## Features

✅ **Authentication System**
- User registration and login
- JWT token-based authentication
- Role-based access control (User & Admin)
- Secure password hashing with bcryptjs

✅ **Contact Form**
- Form validation using Joi
- Email notifications (to admin and visitor)
- Message storage in MongoDB
- Message status tracking (new, read, replied)

✅ **Admin Dashboard**
- View all contact messages
- Message filtering and pagination
- Mark messages as read/replied
- Dashboard statistics
- Admin-only routes protected with JWT

✅ **Email Service**
- Automated email notifications
- Beautiful HTML email templates
- Sends to both admin and visitor
- Support for Gmail SMTP

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Installation

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Edit `.env` file with your settings:
   ```
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/portfolio
   JWT_SECRET=your_secret_key_change_this_in_production
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   EMAIL_ADMIN=admin@jayachandra.com
   CORS_ORIGIN=http://localhost:3000
   ```

## MongoDB Setup

### Option 1: Local MongoDB
```bash
# Windows (in MongoDB bin directory)
mongod

# macOS/Linux
brew services start mongodb-community
```

### Option 2: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update MONGODB_URI in .env with your connection string

## Gmail Setup for Email

1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer"
3. Google will generate a 16-character password
4. Use this password as EMAIL_PASSWORD in .env

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

Server will run on http://localhost:5000

## API Endpoints

### Authentication Routes (`/api/auth`)

**Register New User**
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "jayachandra",
  "email": "jaya@example.com",
  "password": "securePassword123",
  "confirmPassword": "securePassword123"
}
```

**Login**
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "jaya@example.com",
  "password": "securePassword123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "user": { ... },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Get Current User**
```
GET /api/auth/me
Authorization: Bearer {token}
```

### Contact Form Routes (`/api/contact`)

**Submit Contact Form**
```
POST /api/contact/submit
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "subject": "Inquiry about services",
  "message": "I'm interested in hiring you for a project..."
}
```

**Get Messages Stats**
```
GET /api/contact/stats
```

**Get All Messages (last 30 days)**
```
GET /api/contact/messages
```

### Admin Routes (`/api/admin`) - Requires Admin Token

**Get All Messages (Paginated)**
```
GET /api/admin/messages?status=new&page=1&limit=10
Authorization: Bearer {admin_token}
```

**Get Single Message**
```
GET /api/admin/messages/:id
Authorization: Bearer {admin_token}
```

**Update Message Status**
```
PUT /api/admin/messages/:id
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "status": "replied"
}
```

**Delete Message**
```
DELETE /api/admin/messages/:id
Authorization: Bearer {admin_token}
```

**Get Dashboard Statistics**
```
GET /api/admin/dashboard
Authorization: Bearer {admin_token}
```

## Database Models

### User Model
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (hashed, required),
  role: String ('user' | 'admin'),
  createdAt: Date,
  updatedAt: Date
}
```

### Message Model
```javascript
{
  name: String (required),
  email: String (required),
  phone: String,
  subject: String (required),
  message: String (required),
  status: String ('new' | 'read' | 'replied'),
  createdAt: Date
}
```

## Frontend Integration

### Example: Submit Contact Form from Frontend

```javascript
// In your JavaScript file
const submitContactForm = async (formData) => {
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
      console.log('Message sent successfully!');
      // Show success message to user
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Usage
submitContactForm({
  name: 'Your Name',
  email: 'your@email.com',
  phone: '+1234567890',
  subject: 'Inquiry',
  message: 'Your message here'
});
```

### Example: Login and Get Admin Token

```javascript
const login = async (email, password) => {
  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  if (data.success) {
    localStorage.setItem('token', data.token);
    return data.token;
  }
};
```

## Project Structure

```
backend/
├── models/
│   ├── User.js
│   └── Message.js
├── routes/
│   ├── auth.js
│   ├── contact.js
│   └── admin.js
├── middleware/
│   └── auth.js
├── utils/
│   └── email.js
├── server.js
├── .env
├── .env.example
├── package.json
└── README.md
```

## Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT token authentication
- ✅ Role-based access control
- ✅ Input validation with Joi
- ✅ CORS protection
- ✅ Environment variables for sensitive data
- ✅ Email validation
- ✅ Rate limiting ready (add express-rate-limit for production)

## Troubleshooting

**MongoDB Connection Failed**
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify network connectivity if using MongoDB Atlas

**Email Not Sending**
- Verify Gmail app password is correct
- Enable "Less secure app access" if not using app password
- Check EMAIL_USER and EMAIL_PASSWORD in .env
- Check logs for error messages

**CORS Error**
- Verify CORS_ORIGIN in .env matches your frontend URL
- Check frontend is making requests to correct API URL

**Authentication Failed**
- Ensure JWT_SECRET is set in .env
- Verify token is being sent correctly
- Check token hasn't expired

## Next Steps

1. Set up MongoDB connection
2. Configure email service
3. Create admin user via registration
4. Connect frontend to these API endpoints
5. Deploy backend to hosting platform

## Hosting Recommendations

- **Backend**: Heroku, Railway, Render
- **Database**: MongoDB Atlas
- **Email**: Gmail, SendGrid, or Mailgun

## License

ISC

## Author

Jaya Chandra - Full Stack Developer & Storyteller
