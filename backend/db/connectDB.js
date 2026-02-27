const mongoose = require("mongoose");

function connectDB(){
    mongoose.set("strictQuery", false); 
  
    const mongoURI = process.env.MONGO_URI || process.env.DB_LINK;
    
    if (!mongoURI) {
        console.error('❌ Database connection string not found in environment variables');
        console.error('Please set MONGO_URI in your config file');
        process.exit(1);
    }
    
    console.log('Connecting to MongoDB...');
    
    mongoose   
        .connect(mongoURI) 
        .then(function (data) {
            console.log(`✅ MongoDB connected successfully to: ${data.connection.host}`);
        })
        .catch(function (err) {
            console.error('❌ MongoDB connection failed:', err.message);
            console.error('Please check your database connection string and ensure MongoDB is running');
            process.exit(1);
        })
}

module.exports = connectDB