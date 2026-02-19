// ===================================
// Portfolio Backend Configuration
// ===================================

module.exports = {
  // Server Configuration
  server: {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    appName: process.env.APP_NAME || 'Jaya Chandra Portfolio'
  },

  // Email Configuration
  email: {
    service: process.env.EMAIL_SERVICE || 'gmail',
    user: process.env.EMAIL_USER || 'jaya@gmail.com',
    password: process.env.EMAIL_PASSWORD || '',
    adminEmail: process.env.ADMIN_EMAIL || 'jaya@gmail.com'
  },

  // File Upload Configuration
  upload: {
    maxFileSize: process.env.MAX_FILE_SIZE || 100 * 1024 * 1024, // 100MB
    uploadDir: process.env.UPLOAD_DIR || './uploads',
    allowedMimes: [
      'application/zip',
      'application/x-rar-compressed',
      'application/pdf',
      'application/msword',
      'application/octet-stream'
    ]
  },

  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key-change-this',
    expiresIn: process.env.JWT_EXPIRE || '7d'
  },

  // CORS Configuration
  cors: {
    origin: (process.env.CORS_ORIGIN || '*').split(','),
    credentials: true
  },

  // Database Configuration (Optional)
  database: {
    mongodb: process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio',
    user: process.env.MONGODB_USER || 'admin',
    password: process.env.MONGODB_PASSWORD || 'password'
  },

  // Project Information
  project: {
    name: 'Jaya Chandra Portfolio',
    version: '1.0.0',
    author: 'Saddala Jayachandra',
    description: 'Full-Stack Developer Portfolio with Project Management'
  }
};
