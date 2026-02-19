const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { sendContactEmail } = require('../utils/email');
const Joi = require('joi');

// Validation schema
const contactSchema = Joi.object({
    name: Joi.string().required().min(2).max(100),
    email: Joi.string().email().required(),
    phone: Joi.string().optional().allow(''),
    subject: Joi.string().required().min(5).max(100),
    message: Joi.string().required().min(10).max(5000)
});

// Submit contact form
router.post('/submit', async (req, res) => {
    try {
        // Validate input
        const { error, value } = contactSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        // Create message
        const newMessage = new Message(value);
        await newMessage.save();

        // Send email notification to admin
        try {
            await sendContactEmail({
                senderName: value.name,
                senderEmail: value.email,
                senderPhone: value.phone,
                subject: value.subject,
                message: value.message
            });
        } catch (emailError) {
            console.warn('Email sending failed:', emailError.message);
            // Don't fail the request if email fails
        }

        res.status(201).json({
            success: true,
            message: 'Thank you! Your message has been received. I will get back to you soon.',
            messageId: newMessage._id
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get all messages (for admin dashboard)
router.get('/messages', async (req, res) => {
    try {
        // Get only recent messages from last 30 days
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const messages = await Message.find({ createdAt: { $gte: thirtyDaysAgo } })
            .sort({ createdAt: -1 })
            .limit(50);

        res.json({
            success: true,
            count: messages.length,
            messages
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get message stats
router.get('/stats', async (req, res) => {
    try {
        const total = await Message.countDocuments();
        const newMessages = await Message.countDocuments({ status: 'new' });
        const read = await Message.countDocuments({ status: 'read' });
        const replied = await Message.countDocuments({ status: 'replied' });

        res.json({
            success: true,
            stats: {
                total,
                new: newMessages,
                read,
                replied
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
