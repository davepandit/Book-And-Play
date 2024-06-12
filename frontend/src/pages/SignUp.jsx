import React from 'react'
import signupImage from '../assets/3d-business-young-man-in-vr-glasses-sitting-at-his-desk-1.png'

const SignUp = () => {
  return (
    <>
        <div className='bg-customPurple w-full h-screen flex justify-between pl-11 pr-11 max-w-[2000px] mx-auto items-center'>
            {/* left section  */}
            <img src={signupImage} alt="signupimage" className='w-[400px] h-[552px] 2xl:w-[600px] 2xl:h-[828px]'/>
            {/* right section  */}
            <div className='absolute right-0 w-1/2 bg-white text-black rounded-l-extra-large h-screen flex flex-col justify-center items-center gap-5'>
                <span className='font-bold text-3xl'>
                    Sign Up
                </span>
                <div class="">
                    <input type="text" id="name" class="w-[500px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Name" />
                </div>
                <div class="relative inline-block w-[500px]">
                    <select class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full">
                        <option>2024</option>
                        <option>2025</option>
                        <option>2026</option>
                        <option>2027</option>
                        <option>2028</option>
                    </select>
                    
                </div>
                <div class="">
                    <input type="text" id="rollnumber" class="w-[500px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="rollNumber" />
                </div>
                <div class="relative inline-block w-[500px]">
                    <select class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full">
                        <option>B.Tech</option>
                        <option>MBA</option>
                        <option>PHD</option>
                        <option>M.Tech</option>
                    </select>
                </div>
                <div class="mb-4">
                    <input type="number" id="mobileNumber" class="w-[500px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="mobileNumber" />
                </div>
                <div>
                    <button className='bg-customPurple pl-11 pr-11 pt-2 pb-2 rounded-xl text-white font-bold hover:opacity-55 duration-300 ease-in-out'>
                        Generate OTP
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default SignUp