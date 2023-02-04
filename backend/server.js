const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./db/connectDB")


// Handling Uncaught Execption => anything not defind Uncaught Execption 

process.on("uncaughtException" , (err) =>{
    console.log(`Error , ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
})


//config =>
 dotenv.config({path : "backend/config/config.env"})
// Connect With MongoDB
connectDB();

const server =app.listen(process.env.PORT, () =>{
    console.log(`Server is listening on PORT ${process.env.PORT }`);
})

// Unhandled Promise Rejection  => server issue
process.on("unhandledRejection" , (err) =>{ 
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

server.close(() =>{
    process.exit(1);
})
    
})