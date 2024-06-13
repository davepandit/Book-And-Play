import React, { useState } from 'react'
import signupImage from '../assets/3d-business-young-man-in-vr-glasses-sitting-at-his-desk-1.png'
//importing the hooks from the RTK query 
import { useGenerateOTPMutation , useSignupUserMutation } from '../slice/userSlice'
import { toast } from 'react-toastify'
//loader component
import {Vortex} from 'react-loader-spinner'
//link component
import {Link , useNavigate} from 'react-router-dom'

const SignUp = () => {
    //navigate instance
    const navigate = useNavigate()

    //component level state for the otp field
    const [showOTPBox , setShowOTPBox] = useState(false)
    //other states for input box later can use something as the formik so that we need not manage these states independently
    const [name , setName] = useState('')
    const [passingYear , setPassingYear] = useState(2027)
    const [rollNumber , setRollNumber] = useState('')
    const [degree , setDegree] = useState('B.Tech')
    const [mobileNumber , setMobileNumber] = useState()
    const [otp , setOTP] = useState()

    const [generateOTP , {isLoading:optLoading}] = useGenerateOTPMutation()
    const [signupUser , {isLoading:signupLoading}] = useSignupUserMutation()

    const handleOTPGeneration = async() => {
        try {
            //sending request to the backend to generate OTP
            const response = await generateOTP({mobileNumber:Number(mobileNumber)}).unwrap()
            setShowOTPBox(true)
            //this is going to be changed bcz otp will be sent to mobile number
            setOTP(Number(response.otp))
            toast.success('OTP sent successfully', {
                autoClose:2000
            })
        } catch (error) {
            toast.error(`${error.message}`,{
                autoClose:2000
            })
        }
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await signupUser({
                otp:Number(otp),
                name:name,
                mobileNumber:mobileNumber,
                degree:degree,
                rollNumber:rollNumber,
                passingYear:passingYear
            }).unwrap()
            //setting the state to initial ones using formik can reduce all these efforts
            setName('')
            setDegree('B.Tech')
            setPassingYear(2027)
            setRollNumber('')
            setMobileNumber()
            setOTP()
            toast.success(`${response.message}`, {
                autoClose:2000
            })
            //navigate to the login page 
            navigate('/login')
        } catch (error) {
            toast.error(`${error.message}`,{
                autoClose:2000
            })
        }
    }
  return (
    <>
        <div className=' lg:bg-customPurple w-full h-screen flex justify-center lg:justify-between lg:pl-11 lg:pr-11 max-w-[2000px] mx-auto items-center'>
            {/* left section  */}
            <img src={signupImage} alt="signupimage" className='w-[400px] h-[552px] 2xl:w-[600px] 2xl:h-[828px] hidden lg:block'/>
            {/* right section  */}
            <div className='lg:absolute lg:right-0 lg:w-1/2 lg:bg-white text-black lg:rounded-l-extra-large h-screen flex flex-col justify-center items-center gap-5'>
                <span className='font-bold text-3xl whitespace-nowrap'>
                    Set up your profile😎
                </span>
                <form onSubmit={handleSubmit}>
                    <div class="mb-4 ">
                        <input type="text" id="name" name='name' class="w-[350px] lg:w-[400px] xl:w-[500px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Name" value={name} onChange={(e)=>(setName(e.target.value))}/>
                    </div>
                    <div class="mb-4 relative inline-block w-[350px] lg:w-[400px] xl:w-[500px] ">
                        <select class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full" name='passingYear' value={passingYear} onChange={(e)=>(setPassingYear(e.target.value))}>
                            <option>2024</option>
                            <option>2025</option>
                            <option>2026</option>
                            <option>2027</option>
                            <option>2028</option>
                        </select>
                        
                    </div>
                    <div class="mb-4 ">
                        <input type="text" id="rollnumber" name='rollNumber' class="w-[350px] lg:w-[400px] xl:w-[500px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="rollNumber" value={rollNumber} onChange={(e)=>(setRollNumber(e.target.value))}/>
                    </div>
                    <div class="mb-4 relative inline-block w-[350px] lg:w-[400px] xl:w-[500px]">
                        <select class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full" name='degree' value={degree} onChange={(e)=>(setDegree(e.target.value))}>
                            <option>B.Tech</option>
                            <option>MBA</option>
                            <option>PHD</option>
                            <option>M.Tech</option>
                        </select>
                    </div>
                    <div class="mb-4 ">
                        <input type="number" id="mobileNumber" name='mobileNumber' class="w-[350px] lg:w-[400px] xl:w-[500px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="mobileNumber" value={mobileNumber} onChange={(e)=>(setMobileNumber(e.target.value))}/>
                    </div>
                    {
                        showOTPBox ? (
                            <div class="mb-4 flex flex-col gap-3">
                                <label htmlFor="otp" className='font-bold opacity-55'>Enter your OTP:</label>
                                <input type="number" id="otp" name='otp' class="w-[350px] lg:w-[400px] xl:w-[500px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="otp" value={otp} onChange={(e)=>(setOTP(e.target.value))}/>
                            </div>
                        ) : null
                    }
                    {
                        optLoading ? (
                            <div className='flex justify-center items-center opacity-60'>
                                <Vortex
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="vortex-loading"
                                wrapperStyle={{}}
                                wrapperClass="vortex-wrapper"
                                colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                                />
                            </div>
                        ) : null
                    }
                    {
                        signupLoading ? (
                            <div className='flex justify-center items-center opacity-60'>
                                <Vortex
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="vortex-loading"
                                wrapperStyle={{}}
                                wrapperClass="vortex-wrapper"
                                colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                                />
                            </div>
                        ) : null
                    }
                    {
                        !showOTPBox ? (
                            <div className='flex flex-col lg:flex-row justify-center items-center gap-3'>
                                <button className='bg-customPurple pl-11 pr-11 pt-2 pb-2 rounded-xl text-white font-bold hover:opacity-55 duration-300 ease-in-out' type="button" onClick={handleOTPGeneration}>
                                    Generate OTP
                                </button>
                                <span>
                                    <span className='font-bold text-sm opacity-55'>Already have an acoount </span><Link to='/login'><span className='underline hover:cursor-pointer hover:opacity-55'>Log In</span></Link>
                                </span>
                            </div>
                        ) : (
                            <div className='flex flex-col lg:flex-row justify-center items-center gap-3'>
                                <button className='bg-customPurple pl-11 pr-11 pt-2 pb-2 rounded-xl text-white font-bold hover:opacity-55 duration-300 ease-in-out' type='submit'>
                                    Sign In
                                </button>
                                <span>
                                    <span className='font-bold text-sm opacity-55'>Already have an acoount </span><Link to='/login'><span className='underline hover:cursor-pointer hover:opacity-55'>Log In</span></Link>
                                </span>
                            </div>
                        )
                    }
                    
                </form>
            </div>
        </div>
    </>
  )
}

export default SignUp