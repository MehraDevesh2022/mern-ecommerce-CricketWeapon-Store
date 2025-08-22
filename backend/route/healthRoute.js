const express = require("express");
const router = express.Router();

// Health check endpoint
router.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        version: process.env.npm_package_version || '1.0.0'
    });
});

// API status endpoint
router.get("/status", (req, res) => {
    const status = {
        success: true,
        server: "online",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        features: {
            database: !!process.env.MONGO_URI || !!process.env.DB_LINK,
            stripe: !!(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_API_KEY),
            cloudinary: !!(process.env.CLOUDINARY_NAME && process.env.API_KEY && process.env.API_SECRET),
            email: !!process.env.SMTP_MAIL
        }
    };
    
    res.status(200).json(status);
});

module.exports = router;