const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const User = require('../models/User');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Get all messages (admin only)
router.get('/messages', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { status, page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        let query = {};
        if (status) {
            query.status = status;
        }

        const messages = await Message.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Message.countDocuments(query);

        res.json({
            success: true,
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            pages: Math.ceil(total / limit),
            messages
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get single message
router.get('/messages/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).json({
                success: false,
                message: 'Message not found'
            });
        }

        // Mark as read
        message.status = 'read';
        await message.save();

        res.json({
            success: true,
            message
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Update message status
router.put('/messages/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { status } = req.body;

        if (!['new', 'read', 'replied'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status'
            });
        }

        const message = await Message.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        res.json({
            success: true,
            message
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Delete message
router.delete('/messages/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.id);
        if (!message) {
            return res.status(404).json({
                success: false,
                message: 'Message not found'
            });
        }

        res.json({
            success: true,
            message: 'Message deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get dashboard stats
router.get('/dashboard', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const totalMessages = await Message.countDocuments();
        const newMessages = await Message.countDocuments({ status: 'new' });
        const totalUsers = await User.countDocuments();
        
        // Messages in last 7 days
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const recentMessages = await Message.countDocuments({ createdAt: { $gte: sevenDaysAgo } });

        res.json({
            success: true,
            stats: {
                totalMessages,
                newMessages,
                totalUsers,
                recentMessages
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
