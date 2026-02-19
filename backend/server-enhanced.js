require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('public'));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const projectDir = path.join(uploadsDir, 'projects');
    if (!fs.existsSync(projectDir)) {
      fs.mkdirSync(projectDir, { recursive: true });
    }
    cb(null, projectDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'application/zip',
      'application/x-rar-compressed',
      'application/pdf',
      'application/msword',
      'application/octet-stream'
    ];
    
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only ZIP, RAR, PDF, and DOC files are allowed.'));
    }
  }
});

// Email configuration
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'jaya@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password'
  }
});

// ===== API ROUTES =====

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: '✅ API is running',
    timestamp: new Date().toISOString(),
    version: '1.0'
  });
});

// ===== PROJECT UPLOAD ENDPOINT =====
app.post('/api/upload-project', upload.array('files'), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'No files uploaded',
        error: 'Please select at least one file to upload'
      });
    }

    const projectName = req.body.projectName || 'Student Result Management System';
    const uploadedBy = req.body.uploadedBy || 'jaya@gmail.com';

    let totalSize = 0;
    const fileDetails = req.files.map(file => {
      totalSize += file.size;
      return {
        originalName: file.originalname,
        uploadedName: file.filename,
        size: file.size,
        path: file.path
      };
    });

    // Save upload metadata
    const uploadRecord = {
      id: Date.now(),
      projectName: projectName,
      uploadedBy: uploadedBy,
      uploadDate: new Date().toISOString(),
      fileCount: req.files.length,
      totalSize: totalSize,
      files: fileDetails,
      status: 'success'
    };

    // Save to uploads.json
    const uploadsJsonPath = path.join(uploadsDir, 'uploads.json');
    let uploads = [];
    
    if (fs.existsSync(uploadsJsonPath)) {
      const data = fs.readFileSync(uploadsJsonPath, 'utf8');
      uploads = JSON.parse(data);
    }
    
    uploads.push(uploadRecord);
    fs.writeFileSync(uploadsJsonPath, JSON.stringify(uploads, null, 2));

    // Send confirmation email
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: uploadedBy,
        subject: `✅ Project Upload Successful - ${projectName}`,
        html: `
          <div style="font-family: Arial, sans-serif; background: #051a24; color: #fff; padding: 20px;">
            <h2 style="color: #00d9a3;">✓ Project Uploaded Successfully!</h2>
            <div style="background: rgba(0, 217, 163, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0;">
              <p><strong>Project Name:</strong> ${projectName}</p>
              <p><strong>Files Uploaded:</strong> ${req.files.length}</p>
              <p><strong>Total Size:</strong> ${(totalSize / 1024 / 1024).toFixed(2)} MB</p>
              <p><strong>Upload Time:</strong> ${new Date().toLocaleString()}</p>
            </div>
            <p style="color: #00d9a3; margin-top: 20px;">Thank you for using the portfolio management system!</p>
          </div>
        `
      });
    } catch (emailError) {
      console.log('Email notification failed:', emailError.message);
    }

    res.json({
      success: true,
      message: 'Project uploaded successfully!',
      data: {
        projectName: projectName,
        fileCount: req.files.length,
        totalSize: (totalSize / 1024 / 1024).toFixed(2) + ' MB',
        uploadDate: new Date().toISOString(),
        uploadId: uploadRecord.id
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Upload failed',
      error: error.message
    });
  }
});

// ===== CONTACT FORM ENDPOINT =====
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Save contact message
    const contactRecord = {
      id: Date.now(),
      name: name,
      email: email,
      subject: subject,
      message: message,
      timestamp: new Date().toISOString(),
      status: 'received'
    };

    const contactsJsonPath = path.join(uploadsDir, 'contacts.json');
    let contacts = [];
    
    if (fs.existsSync(contactsJsonPath)) {
      const data = fs.readFileSync(contactsJsonPath, 'utf8');
      contacts = JSON.parse(data);
    }
    
    contacts.push(contactRecord);
    fs.writeFileSync(contactsJsonPath, JSON.stringify(contacts, null, 2));

    // Send email to admin
    try {
      await transporter.sendMail({
        from: email,
        to: process.env.EMAIL_USER || 'jaya@gmail.com',
        subject: `New Contact: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif;">
            <h2>New Contact Message</h2>
            <p><strong>From:</strong> ${name} (${email})</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p style="color: #666; font-size: 12px;">Received: ${new Date().toLocaleString()}</p>
          </div>
        `
      });

      // Send confirmation email to user
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: `✓ Message Received - ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif;">
            <h2>Thank you for reaching out!</h2>
            <p>Hi ${name},</p>
            <p>I have received your message and will get back to you as soon as possible.</p>
            <div style="background: #f5f5f5; padding: 15px; margin: 15px 0;">
              <p><strong>Your Message:</strong></p>
              <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
            <p>Best regards,<br>Saddala Jayachandra</p>
          </div>
        `
      });
    } catch (emailError) {
      console.log('Email notification failed:', emailError.message);
    }

    res.json({
      success: true,
      message: 'Message received! I will contact you soon.',
      messageId: contactRecord.id
    });

  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process contact form',
      error: error.message
    });
  }
});

// ===== GET UPLOAD HISTORY (Admin) =====
app.get('/api/uploads', (req, res) => {
  try {
    const uploadsJsonPath = path.join(uploadsDir, 'uploads.json');
    
    if (!fs.existsSync(uploadsJsonPath)) {
      return res.json({ success: true, data: [] });
    }

    const data = fs.readFileSync(uploadsJsonPath, 'utf8');
    const uploads = JSON.parse(data);

    res.json({
      success: true,
      data: uploads,
      count: uploads.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch uploads',
      error: error.message
    });
  }
});

// ===== GET CONTACT MESSAGES (Admin) =====
app.get('/api/contacts', (req, res) => {
  try {
    const contactsJsonPath = path.join(uploadsDir, 'contacts.json');
    
    if (!fs.existsSync(contactsJsonPath)) {
      return res.json({ success: true, data: [] });
    }

    const data = fs.readFileSync(contactsJsonPath, 'utf8');
    const contacts = JSON.parse(data);

    res.json({
      success: true,
      data: contacts,
      count: contacts.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts',
      error: error.message
    });
  }
});

// ===== STUDENT RESULT MANAGEMENT =====
app.post('/api/results/submit', (req, res) => {
  try {
    const { studentName, studentId, subjects, totalMarks } = req.body;

    if (!studentName || !studentId || !subjects) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const resultRecord = {
      id: Date.now(),
      studentName: studentName,
      studentId: studentId,
      subjects: subjects,
      totalMarks: totalMarks,
      submittedDate: new Date().toISOString(),
      status: 'submitted'
    };

    const resultsJsonPath = path.join(uploadsDir, 'results.json');
    let results = [];
    
    if (fs.existsSync(resultsJsonPath)) {
      const data = fs.readFileSync(resultsJsonPath, 'utf8');
      results = JSON.parse(data);
    }
    
    results.push(resultRecord);
    fs.writeFileSync(resultsJsonPath, JSON.stringify(results, null, 2));

    res.json({
      success: true,
      message: 'Result submitted successfully',
      resultId: resultRecord.id
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to submit result',
      error: error.message
    });
  }
});

// ===== GET RESULTS =====
app.get('/api/results/:studentId', (req, res) => {
  try {
    const resultsJsonPath = path.join(uploadsDir, 'results.json');
    
    if (!fs.existsSync(resultsJsonPath)) {
      return res.json({ success: true, data: null });
    }

    const data = fs.readFileSync(resultsJsonPath, 'utf8');
    const results = JSON.parse(data);
    const studentResult = results.find(r => r.studentId === req.params.studentId);

    res.json({
      success: true,
      data: studentResult || null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch result',
      error: error.message
    });
  }
});

// ===== ERROR HANDLING =====
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.path
  });
});

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
  ========================================
  🚀 Portfolio Backend Server Running
  ========================================
  📡 Server: http://localhost:${PORT}
  🔗 API Health: http://localhost:${PORT}/api/health
  📁 Uploads: ${uploadsDir}
  ========================================
  `);
});

module.exports = app;