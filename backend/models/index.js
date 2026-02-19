// Database Configuration for MongoDB
const mongoose = require('mongoose');

const projectUploadSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
    trim: true
  },
  uploadedBy: {
    type: String,
    required: true,
    lowercase: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  fileCount: {
    type: Number,
    required: true
  },
  totalSize: {
    type: Number,
    required: true
  },
  files: [{
    originalName: String,
    uploadedName: String,
    size: Number,
    path: String
  }],
  status: {
    type: String,
    enum: ['success', 'failed', 'pending'],
    default: 'success'
  }
});

const ContactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    match: /.+\@.+\..+/
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['received', 'read', 'replied'],
    default: 'received'
  }
});

const StudentResultSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    trim: true
  },
  studentId: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  subjects: [{
    name: String,
    marks: Number,
    grade: String
  }],
  totalMarks: {
    type: Number,
    required: true
  },
  percentage: Number,
  grade: String,
  submittedDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['submitted', 'approved', 'published'],
    default: 'submitted'
  }
});

// Add indexes for faster queries
projectUploadSchema.index({ uploadedBy: 1, uploadDate: -1 });
ContactMessageSchema.index({ email: 1, timestamp: -1 });
StudentResultSchema.index({ studentId: 1 });

module.exports = {
  ProjectUpload: mongoose.model('ProjectUpload', projectUploadSchema),
  ContactMessage: mongoose.model('ContactMessage', ContactMessageSchema),
  StudentResult: mongoose.model('StudentResult', StudentResultSchema)
};