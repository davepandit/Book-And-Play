import dotenv from 'dotenv'
dotenv.config()
import User from "../models/users.models.js"
import OTP from "../models/otp.models.js"
import jwt from 'jsonwebtoken';
import { twilioClient } from '../index.js';

//signup user
export const signupUser = async(req , res) => {
    const {otp , name , mobileNumber , degree , rollNumber , passingYear} = req.body
    try {
        //check whether the entered otp is there in the otp schema or not
        const otpExists = await OTP.find({otp:Number(otp) , mobileNumber:Number(mobileNumber)})
        //i dont know what will happen when 2 req are made at the same time but for now it works
        if(otpExists.length == 0){
            res.status(400).json({
                message:'Incorrect OTP'
            })
        }
        else{
            //save to the database
            //before creating a user need to check whether someone with same credentials exist or not and also check for the phone number
            const existedUser = await User.find({rollNumber:rollNumber})
            const existedMobileNumber = await User.find({mobileNumber:mobileNumber})
            if(!existedUser.length == 0 || !existedMobileNumber.length == 0){
                res.status(400).json({
                    message:'User already exists or entered mobile number is not correct'
                })
            }else{
                const user = await User.create({
                    name:name,
                    mobileNumber:mobileNumber,
                    degree:degree,
                    rollNumber:rollNumber,
                    passingYear:Number(passingYear)
                })
                res.status(201).json({
                    message:'User created successfully'
                })
                }
            }
            
        
    } catch (error) {
        res.status(400).json({
            error:error.message
        })
    }
}


//generate otp 
export const generateOTP = async(req , res) => {
    const {mobileNumber} = req.body
    //this generated otp will go to the mobile number only 
    //generate an otp 
    let otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    try {
        //save the otp to the database
        const generatedOTP = await OTP.create({
            otp:otp,
            mobileNumber:Number(mobileNumber)
        })

        
        if(!generateOTP){
            res.status(400).json({
                message:'OTP cannot be generated'
            })
        }else{
            //send the message to the user's phone number 
            await twilioClient.messages.create({
                body:`Your Verification OTP is: ${otp}`,
                to: `+91${mobileNumber}`,
                from: process.env.TWILIO_PHONE_NUMBER
            })
            res.status(201).json({
                message:'OTP generated successfully',
                otp:generatedOTP.otp
            })
        }
    } catch (error) {
        res.status(400).json({
            error:error.message
        })
    }
}


//login user
export const loginUser = async(req , res) => {
    //here we will generate a token 
    const {rollNumber , mobileNumber} = req.body
    try {
        const user = await User.find({rollNumber:rollNumber, mobileNumber:mobileNumber})
        //check whether there is something in the user array
        if(user.length == 0){
            res.staus(400).json({
                message:'Incorrect credentials'
            })
        }else{
            //generate a token 
            const token = jwt.sign({"user_id":user[0]._id,"rollNumber":rollNumber} , process.env.JWT_SECRET , {
                expiresIn: '7d'
            })

            //set the token in the cookies
            res.cookie('token' , token , {
                httpOnly: true,
                sameSite:'strict',
            })
            res.status(200).json({
                _id:user[0]._id,
                name:user[0].name,
                mobileNumber:user[0].mobileNumber,
                degree:user[0].degree,
                rollNumber:user[0].rollNumber,
                isAdmin:user[0].isAdmin,
                passingYear:user[0].passingYear,
                credits:user[0].credits


            })
        }
    } catch (error) {
        res.status(400).json({
            error:error.message
        })
    }

}

//logout user
export const logoutUser= (req , res) => {
    res.clearCookie('token' , {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({message: 'User logged out successfully'})
}

//update profile
export const updateProfileHandler = async(req , res) => {
    const {userId , name , mobileNumber , degree , passingYear , rollNumber} = req.body
    try {
        //update the profile
        //see whether such a profile exsits or not
        const userExist = await User.findOne({_id:userId})
        if(!userExist){
            return res.status(404).json({
                message:'User not found'
            })
        }else{
            //update the user credentials
            userExist.name = name,
            userExist.mobileNumber = Number(mobileNumber),
            userExist.degree = degree,
            userExist.passingYear = Number(passingYear),
            userExist.rollNumber = rollNumber

            //save the upadte doc
            await userExist.save()

            return res.status(201).json({
                message:'Updated details successfully',
                updatedUserCredentials:{
                    _id:userExist._id,
                    name:userExist.name,
                    mobileNumber:userExist.mobileNumber,
                    degree:userExist.degree,
                    rollNumber:userExist.rollNumber,
                    isAdmin:userExist.isAdmin,
                    passingYear:userExist.passingYear,
                    credits:userExist.credits
                }
            })
        }
        //if yes then update otherwise let it go
    } catch (error) {
        res.status(400).json({
            message:error.data.message
        })
    }
}