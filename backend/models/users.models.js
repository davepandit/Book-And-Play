import mongoose, { mongo } from "mongoose";

//user schema
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:Number,
        required:true,
        unique:true
    },
    //in the frontend the degree must be a dropdown so that the client can select his degree
    degree:{
        type:String,
        required:true

    },
    rollNumber:{
        type:String,
        required:true,
        unique:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    //this should also be a dropdown in the frontend
    passingYear:{
        type:Number,
        required:true
    },
    //the reason behind 20 credits is that user can do 4 irresponsible bookings
    credits:{
        type:Number,
        default:20
    }
},{
    timestamps: true,
})

const User = mongoose.model('User' , userSchema)

export default User