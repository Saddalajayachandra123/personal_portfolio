# 🎯 Jaya Chandra - Full Stack Developer Portfolio

## 🌟 Welcome!

This is a **production-ready, full-stack portfolio** featuring:

- ✨ Modern, futuristic design with dark teal color scheme
- 📱 Fully responsive (mobile, tablet, desktop)
- 🚀 Node.js/Express backend with file uploads
- 📧 Email notifications (Gmail integration)
- 📁 Project file management system
- 🎓 Student result management
- 💻 No external dependencies on frontend (vanilla JS/CSS)

---

## 📂 Project Structure

```
Portfolio/
├── index.html                      # Main portfolio page
├── script.js                       # Frontend functionality
├── styles-new.css                 # Dark teal theme styling
├── open_certificates.bat           # Certificate manager (Windows)
│
├── backend/                        # 🚀 Node.js/Express Server
│   ├── server-enhanced.js         # Main backend server
│   ├── package.json               # Dependencies
│   ├── .env.example               # Configuration template
│   ├── config.js                  # Configuration loader
│   ├── BACKEND_SETUP_GUIDE.md    # Setup instructions
│   ├── BACKEND_API_DOCS.md        # API documentation
│   ├── routes/                    # API routes
│   ├── models/                    # Database models
│   ├── middleware/                # Express middleware
│   ├── utils/                     # Utility functions
│   └── uploads/                   # Generated: uploaded files
│
├── images/                        # Image assets
├── CUSTOMIZATION_GUIDE.md         # Design customization
├── PUBLISH_CERTIFICATE.md         # Publication details
├── IMAGE_SETUP.md                 # Image setup guide
└── README.md                      # This file
```

---

## 🚀 Quick Start

### Frontend Only (No Backend)

```bash
# Simply open in browser
start index.html

# Or open with Python server
python -m http.server 8000
# Visit http://localhost:8000
```

### With Backend (Full Features)

**Terminal 1 - Start Backend:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 - Serve Frontend:**
```bash
# Keep Terminal 1 running
python -m http.server 8000
# Or use any other static server
```

**Browser:**
```
http://localhost:8000
```

---

## ✨ Features

### Frontend Features
- 🎨 Dark teal theme (#0d3d56) with neon accents (#00d9a3)
- 🎭 Scroll animations (fade-in, slide-up effects)
- 📱 Mobile-first responsive design
- 🧭 Smooth navigation with active link highlighting
- 🔗 Social links (Email, LinkedIn, GitHub, Instagram)
- 🎓 Education & Skills showcase
- 🌟 Professional projects display
- 📂 Project file upload modal
- 🔐 Certificate management system

### Backend Features
- 📤 File upload handling (ZIP, RAR, PDF, DOC)
- 📧 Email notifications (Gmail/Nodemailer)
- 💾 Persistent JSON data storage
- 📊 Upload history tracking
- 📬 Contact form processing
- 🎓 Student result management
- 🔍 Data retrieval APIs
- ⚠️ Comprehensive error handling
- 🛡️ CORS security configuration
- 📝 Input validation

---

## 🔧 Configuration

### Backend Setup (.env)

```bash
# 1. Copy template
cp backend/.env.example backend/.env

# 2. Edit backend/.env
PORT=5000
NODE_ENV=development
EMAIL_USER=jaya@gmail.com
EMAIL_PASSWORD=your_app_password
```

### Gmail App Password
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification
3. Generate [App Password](https://myaccount.google.com/apppasswords)
4. Copy 16-character password to `.env`

**Detailed setup:** See [BACKEND_SETUP_GUIDE.md](backend/BACKEND_SETUP_GUIDE.md)

---

## 📡 API Endpoints

All endpoints are documented in [BACKEND_API_DOCS.md](backend/BACKEND_API_DOCS.md)

### Key Endpoints

```
POST   /api/upload-project      # Upload project files
POST   /api/contact             # Submit contact form
GET    /api/uploads             # View upload history
GET    /api/contacts            # View contact messages
POST   /api/results/submit      # Submit student results
GET    /api/results/:studentId  # Get student results
GET    /api/health              # Server health check
```

---

## 💻 Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Grid, Flexbox, Animations
- **JavaScript** - ES6+, Fetch API, DOM manipulation
- **Design** - Dark teal theme, Responsive layout

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Multer** - File upload handling
- **Nodemailer** - Email service
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment configuration
- **JSON** - Data persistence (or MongoDB optional)

### Deployment Options
- Railway.app (recommended)
- Heroku
- Vercel
- Docker
- Local PM2
- Cloud servers (AWS, GCP, Azure)

---

## 🎨 Customization

### Change Theme Colors

Edit `styles-new.css`:
```css
:root {
  --primary-dark: #0d3d56;      /* Main background */
  --primary-teal: #00d9a3;      /* Accent color */
  --teal-darker: #1db584;       /* Darker accent */
}
```

### Update Personal Info

Edit `index.html`:
```html
<h1 class="name-text">jaya<br>Chandra</h1>
<p class="tagline">Full Stack Developer | Problem Solver</p>
```

### Modify Projects

Edit projects section in `index.html` - Add/remove project cards

See [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md) for detailed instructions.

---

## 📊 Project Highlights

### Student Result Management System
- 📁 File upload capability
- 📊 Result tracking
- 📈 Grade calculation
- 🔍 Result retrieval by student ID
- 📧 Result notifications

### Skills Showcase
- Frontend: React, HTML/CSS, JavaScript
- Backend: Node.js, Express, MongoDB
- Tools: Git, Docker, REST APIs

### Professional Projects
- 6 featured projects with GitHub links
- Technology badges
- Project descriptions
- Demo/GitHub buttons

---

## 🔐 Security

### Environment Variables
- Never commit `.env` file
- Use `.env.example` as template
- Keep `.env` in `.gitignore`

### File Upload Security
- Limited to 100MB per file
- Whitelist file types
- Scan for viruses (optional)
- Store outside web root

### API Security
- CORS enabled
- Input validation
- Error message sanitizing
- Rate limiting (recommended for production)

### Database
- JSON storage for simplicity
- Optional MongoDB integration
- Schema validation with Mongoose

---

## 🚀 Deployment

### Deploy to Railway (5 minutes)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Portfolio with backend"
   git push
   ```

2. **Deploy on Railway**
   - Go to [railway.app](https://railway.app)
   - Connect GitHub repo
   - Deploy automatic
   - Set `.env` variables

### Deploy Locally (PM2)

```bash
npm install -g pm2
cd backend
pm2 start server-enhanced.js
pm2 startup
pm2 save
```

**See [BACKEND_SETUP_GUIDE.md](backend/BACKEND_SETUP_GUIDE.md) for all deployment options**

---

## 📂 Data Storage

Backend saves data in JSON files:

```
backend/uploads/
├── uploads.json           # Project upload records
├── contacts.json          # Contact form messages
├── results.json           # Student results
└── projects/              # Uploaded project files
```

**Backup Strategy**: Regularly backup `uploads/` directory

---

## 🧪 Testing

### Test Frontend
```bash
# Open in browser
start index.html

# Or with server
python -m http.server 8000
```

### Test Backend
```bash
# Health check
curl http://localhost:5000/api/health

# View uploads
curl http://localhost:5000/api/uploads

# Upload file (using Postman or frontend)
```

### Test Full Integration
1. Start backend: `npm run dev` (in `backend/`)
2. Open frontend: `http://localhost:8000`
3. Upload file to "Student Result Management System" project
4. Check success modal
5. Verify `backend/uploads/uploads.json` has entry

---

## 📞 Contact Information

- **Email**: [jaya@gmail.com](mailto:jaya@gmail.com)
- **GitHub**: [@jayachandra_saddala](https://github.com/)
- **LinkedIn**: [Saddala Jayachandra](https://linkedin.com/)
- **Instagram**: [@jayachandra_saddala](https://instagram.com/)

---

## 📋 Checklist

### Before Deployment
- [ ] Backend starts without errors
- [ ] Frontend loads correctly
- [ ] File upload works end-to-end
- [ ] Emails send successfully
- [ ] `.env` configured with real credentials
- [ ] `.env` added to `.gitignore`
- [ ] All secrets removed from code
- [ ] Backup strategy in place

### Going Live
- [ ] Deploy backend to Railway/Heroku
- [ ] Configure domain (optional)
- [ ] Setup SSL/HTTPS
- [ ] Monitor logs and errors
- [ ] Backup data regularly
- [ ] Update contact email if needed

---

## ⚠️ Troubleshooting

### Backend won't start?
```bash
# Check if port 5000 is already in use
netstat -ano | findstr :5000

# Use different port
set PORT=5001 && npm run dev
```

### Upload fails?
- Check backend is running
- Verify file size < 100MB
- Check file type allowed (ZIP, RAR, PDF, DOC)
- View browser console for errors

### Email not working?
- Verify `.env` has correct Gmail credentials
- Check App Password set correctly
- Confirm 2-Step Verification enabled
- Check spam folder

**See [BACKEND_SETUP_GUIDE.md](backend/BACKEND_SETUP_GUIDE.md#-troubleshooting) for more**

---

## 📚 Documentation

- [BACKEND_SETUP_GUIDE.md](backend/BACKEND_SETUP_GUIDE.md) - Complete backend setup
- [BACKEND_API_DOCS.md](backend/BACKEND_API_DOCS.md) - API reference
- [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md) - Design customization
- [IMAGE_SETUP.md](IMAGE_SETUP.md) - Image configuration

---

## 📈 Version History

**v1.0** (Current)
- Complete frontend with dark teal theme
- Full Node.js/Express backend
- Project upload system
- Email notifications
- Student result management
- Production-ready code

---

## 📄 License

This portfolio is a personal project. Feel free to use as template.

---

## 🤝 Support

Need help?
1. Check troubleshooting section above
2. Review [BACKEND_SETUP_GUIDE.md](backend/BACKEND_SETUP_GUIDE.md)
3. Read [BACKEND_API_DOCS.md](backend/BACKEND_API_DOCS.md)
4. Contact: jaya@gmail.com

---

**Last Updated**: February 2024  
**Status**: ✅ Production Ready  
**Version**: 1.0.0

---

## 🎉 Ready to Launch?

```bash
# Start backend
cd backend && npm run dev

# Start frontend (in another terminal)
python -m http.server 8000

# Open in browser
http://localhost:8000

# Deploy when ready!
```

Happy coding! 🚀