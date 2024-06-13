import { apiSlice } from "./apiSlice";

const userSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        generateOTP:builder.mutation({
            query:(data)=>({
                url:'/users/generateOTP',
                method:'POST',
                body:data
                //from the frontend should send the mobile number as an object 
            })
        }),
        signupUser:builder.mutation({
            query:(data)=>({
                url:'/users/signup',
                method:'POST',
                body:data
                //from the frontend should send otp , mobile number and all can check the controller for that purpose
            })
        })
    })
})

export const {useGenerateOTPMutation , useSignupUserMutation} = userSlice