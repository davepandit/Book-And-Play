import mongoose from "mongoose";
import User from "./users.models.js";

const bookingSchema = mongoose.Schema({
    sportName:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    mobileNumber:{
        type:Number,
        required:true
    },
    rollNumber:{
        type:String,
        required:true
    },
    reported:{
        type:Boolean,
        default:false
    },
    slotNumber:{
        type: String,
        required:true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
},
{
    timestamps:true
})


const Booking = mongoose.model('Booking' , bookingSchema)

export default Booking