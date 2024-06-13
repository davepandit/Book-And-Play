import mongoose from "mongoose";

const otpSchema = mongoose.Schema({
    otp:{
        type:Number,
        required:true
    },
    mobileNumber:{
        type:Number,
        required:true,
        default:8888888888,
        unique:true
    }
},{
    timestamps:true
})

const OTP = mongoose.model('OTP' , otpSchema)

export default OTP