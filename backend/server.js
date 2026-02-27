const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./db/connectDB")
const cloudinary = require("cloudinary");

// Handling Uncaught Exception => anything not defined Uncaught Exception 
process.on("uncaughtException", (err) => {
    console.error('=== UNCAUGHT EXCEPTION ===');
    console.error('Timestamp:', new Date().toISOString());
    console.error('Error Name:', err.name);
    console.error('Error Message:', err.message);
    console.error('Stack Trace:', err.stack);
    console.error('==========================');
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
})


//config =>
dotenv.config({path : "backend/config/config.env"})

// Validate essential environment variables
const requiredEnvVars = ['JWT_SECRET'];
const databaseVars = ['MONGO_URI', 'DB_LINK']; // Either one is required
const optionalButRecommended = ['STRIPE_SECRET_KEY', 'STRIPE_API_KEY', 'CLOUDINARY_NAME', 'API_KEY', 'API_SECRET'];

console.log('=== ENVIRONMENT VALIDATION ===');
const missingRequired = requiredEnvVars.filter(envVar => !process.env[envVar]);
const hasDatabaseConnection = databaseVars.some(envVar => process.env[envVar]);
const missingRecommended = optionalButRecommended.filter(envVar => !process.env[envVar]);

if (missingRequired.length > 0 || !hasDatabaseConnection) {
    console.error('❌ Missing required environment variables:');
    if (missingRequired.length > 0) {
        console.error('  Required:', missingRequired);
    }
    if (!hasDatabaseConnection) {
        console.error('  Database: Need either MONGO_URI or DB_LINK');
    }
    console.error('Please check your config file at backend/config/config.env');
    console.error('You can use backend/config/config.env.example as a template');
    process.exit(1);
}

if (missingRecommended.length > 0) {
    console.warn('⚠️  Missing recommended environment variables:', missingRecommended);
    console.warn('Some features may not work properly without these variables.');
    console.warn('Check backend/config/config.env.example for reference');
}

console.log('✅ Environment validation completed');
console.log('===============================');

// Connect With MongoDB
connectDB();


// conncet with cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT || PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Server started at: ${new Date().toISOString()}`);
});

// Unhandled Promise Rejection => server issue
process.on("unhandledRejection", (err) => { 
    console.error('=== UNHANDLED PROMISE REJECTION ===');
    console.error('Timestamp:', new Date().toISOString());
    console.error('Error Name:', err.name);
    console.error('Error Message:', err.message);
    console.error('Stack Trace:', err.stack);
    console.error('====================================');
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    // if there any issue occurs eg : broken host link eg : then return msg and server will close
    server.close(() => {
        process.exit(1);
    })
})