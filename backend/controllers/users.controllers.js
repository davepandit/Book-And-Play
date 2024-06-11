import User from "../models/users.models.js"
import OTP from "../models/otp.models.js"

//signup user
export const signupUser = async(req , res) => {
    const {otp , name , mobileNumber , degree , rollNumber , passingYear} = req.body
    try {
        //check whether the entered otp is there in the otp schema or not
        const otpExists = await OTP.find({otp:Number(otp)})
        //i dont know what will happen when 2 req are made at the same time but for now it works
        await OTP.findOneAndDelete({ otp: Number(otp) });
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
        req.status(400).json({
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
            otp:otp
        })
        if(!generateOTP){
            res.status(400).json({
                message:'OTP cannot be generated'
            })
        }else{
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