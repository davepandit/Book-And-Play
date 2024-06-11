import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import { connectToDatabase } from './database/database.js';
import userRouter from './routes/users.routes.js'

//connect to the database
connectToDatabase()

//make an app
const app = express()

//port
const port = process.env.PORT

//inbuilt middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

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