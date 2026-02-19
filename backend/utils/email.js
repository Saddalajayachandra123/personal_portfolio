const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
    service: process.env.SMPT_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Send contact form email
const sendContactEmail = async (contactData) => {
    try {
        // Email to admin
        const adminMailOptions = {
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_ADMIN,
            subject: `New Contact Form Submission: ${contactData.subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #3b82f6;">New Contact Message</h2>
                    
                    <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>From:</strong> ${contactData.senderName}</p>
                        <p><strong>Email:</strong> <a href="mailto:${contactData.senderEmail}">${contactData.senderEmail}</a></p>
                        ${contactData.senderPhone ? `<p><strong>Phone:</strong> ${contactData.senderPhone}</p>` : ''}
                        <p><strong>Subject:</strong> ${contactData.subject}</p>
                    </div>

                    <div style="background: #ffffff; padding: 20px; border-left: 4px solid #3b82f6;">
                        <h3>Message:</h3>
                        <p style="line-height: 1.6; white-space: pre-wrap;">${contactData.message}</p>
                    </div>

                    <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
                    <p style="color: #666; font-size: 12px;">
                        This message was sent from your portfolio contact form.
                    </p>
                </div>
            `
        };

        // Email to visitor confirming receipt
        const visitorMailOptions = {
            from: `"Jaya Chandra" <${process.env.EMAIL_USER}>`,
            to: contactData.senderEmail,
            subject: 'Message Received - Thank You!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #3b82f6;">Thank You for Reaching Out!</h2>
                    
                    <p>Hi ${contactData.senderName},</p>
                    
                    <p>I have received your message and appreciate you taking the time to contact me. 
                    Here's a copy of what you sent:</p>

                    <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>Subject:</strong> ${contactData.subject}</p>
                        <p style="line-height: 1.6; white-space: pre-wrap;">${contactData.message}</p>
                    </div>

                    <p>I will review your message carefully and get back to you as soon as possible, usually within 24-48 hours.</p>

                    <p>Best regards,<br>
                    <strong>Jaya Chandra</strong><br>
                    Full Stack Developer & Storyteller</p>

                    <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
                    <p style="color: #666; font-size: 12px;">
                        Feel free to reply to this email if you have any additional information to share.
                    </p>
                </div>
            `
        };

        // Send both emails
        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(visitorMailOptions);

        console.log(`✅ Emails sent for message from ${contactData.senderEmail}`);
        return true;
    } catch (error) {
        console.error('❌ Email sending error:', error.message);
        throw error;
    }
};

// Test email configuration
const testEmailConfig = async () => {
    try {
        await transporter.verify();
        console.log('✅ Email configuration verified successfully');
        return true;
    } catch (error) {
        console.error('❌ Email configuration error:', error.message);
        return false;
    }
};

module.exports = {
    sendContactEmail,
    testEmailConfig
};
