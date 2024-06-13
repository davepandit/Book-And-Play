import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import { connectToDatabase } from './database/database.js';
import userRouter from './routes/users.routes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';

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

//server code
app.listen(port , ()=>{
    console.log(`Server is running at port ${port}🚀`)
})