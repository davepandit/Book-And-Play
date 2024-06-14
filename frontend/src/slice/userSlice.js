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
        }),
        loginUser:builder.mutation({
            query:(data)=>({
                url:'/users/login',
                method:'POST',
                body:data
            })
        }),
        logoutUser:builder.mutation({
            query:()=>({
                url:'/users/logout',
                method:'POST',
            })
        })
    })
})

export const {useGenerateOTPMutation , useSignupUserMutation , useLoginUserMutation , useLogoutUserMutation} = userSlice