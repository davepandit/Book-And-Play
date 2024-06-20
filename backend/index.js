import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import { connectToDatabase } from './database/database.js';
import userRouter from './routes/users.routes.js'
import gamesRouter from './routes/game.routes.js'
import bookingRouter from './routes/booking.routes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import cron from 'node-cron';

//connect to the database
connectToDatabase()

//make an app
const app = express()

//port
const port = process.env.PORT

//cors options
const corsOptions = {
    origin: 'http://localhost:5173', // Allow only this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow these HTTP methods
    credentials: true  // Allow cookies and other credentials
};

//inbuilt middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(cors(corsOptions));

//get request
app.get('/' , (req , res)=>(
    res.send('Hello there🚀')
))

//configs and middlewares
app.use('/api/users' , userRouter)
app.use('/api/games' , gamesRouter)
app.use('/api/booking' , bookingRouter)


// Schedule task to run every Sunday at midnight
cron.schedule('0 0 * * 0', async () => {
    try {
      await User.updateMany({}, { $set: { credits: 20 } });
      console.log('Credits reset to 20 for all users');
    } catch (error) {
      console.error('Error resetting credits:', error);
    }
  });

//server code
app.listen(port , ()=>{
    console.log(`Server is running at port ${port}🚀`)
})