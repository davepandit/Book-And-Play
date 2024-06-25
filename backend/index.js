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
import User from './models/users.models.js';
import Booking from './models/booking.models.js';
import moment from 'moment';
import twilio from 'twilio'


//connect to the database
connectToDatabase()

//make an app
const app = express()

//port
const port = process.env.PORT

//twilio setup
const accountid = process.env.TWILIO_ACCOUNT_SID
const authtoken = process.env.TWILIO_AUTH_TOKEN

export const twilioClient = new twilio(accountid , authtoken)

//cors options
const corsOptions = {
    origin: 'http://localhost:5173', // Allow only this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE' , 'PATCH'],  // Allow these HTTP methods
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
      await User?.updateMany({}, { $set: { credits: 20 } });
      console.log('Credits reset to 20 for all users');
    } catch (error) {
      console.error('Error resetting credits:', error);
    }
  });

//send message to the user 25 minutes before thier slot
// const sendMessageToUser = async(mobileNumber) => {
//   await twilioClient.messages.create({
//     body:`Your slot is starting in next 25 minutes. Please report 5 minutes earlier.`,
//     from:process.env.TWILIO_PHONE_NUMBER,
//     to:`+91${mobileNumber}`
//   })
// }
// Schedule task to run every minute
// cron.schedule('* * * * *', async() => {
//   const currentTime = moment() //current time
//   const currentformattedTime = currentTime.format('YYYY-MM-DD hA');
//   const fifteenMinutesAhead = moment().add(20, 'minutes'); // 15 minutes from now
//   const fifteenMinutesAheadFormattedTime = fifteenMinutesAhead.format('YYYY-MM-DD hA')

//   const allBookings = await Booking?.find({}) //this returns an array of docs
//   //loop through the allBookings and send a message if the slot is just about 15 min to get started
//   allBookings.forEach((booking)=>{
//     const startTime = moment(`${booking.date} ${booking.startTime}`, 'YYYY-MM-DD hA')

//     // if the startTime is in between the current fromatted time and a formatted time fifteen minutes ahead then send the message 
//     if (startTime.isBetween(currentformattedTime, fifteenMinutesAheadFormattedTime)) {
//       // Send message to user
//       // sendMessageToUser(booking.mobileNumber);
//       console.log('Your slot is starting in next 25 minutes. Please report 5 minutes earlier')
//     }

//   })

// },{
//    timezone: 'Asia/Kolkata'
// })


//server code
app.listen(port , ()=>{
    console.log(`Server is running at port ${port}🚀`)
})