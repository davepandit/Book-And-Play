import React from 'react'
import { useState } from 'react'
import loginImage from '../assets/3d-hygge-isometric-view-of-colleagues-having-meeting.png'

const Login = () => {

    //component level states
    const [rollNumber , setRollNumber] = useState('')
    const [mobileNumber , setMobileNumber] = useState()

    const handleSubmit = async(e) => {
        e.preventDefault()
    }
  return (
    <>
        <div className=' lg:bg-customBlue w-full h-screen flex justify-center lg:justify-between lg:pl-11 lg:pr-11 sm-2000:pl-28 sm-2000:pr-28 items-center'>
            {/* left section  */}
            <img src={loginImage} alt="loginimage" className='w-[400px] h-[334px] 2xl:w-[600px] 2xl:h-[501px] hidden lg:block'/>
            {/* right section  */}
            <div className='lg:absolute lg:right-0 lg:w-1/2 lg:bg-white text-black lg:rounded-l-extra-large h-screen flex flex-col justify-center items-center gap-5'>
                <span className='font-bold text-3xl whitespace-nowrap'>
                    Log In😎
                </span>
                <form onSubmit={handleSubmit}>
                    <div class="mb-4 ">
                        <input type="text" id="rollNumber" name='rollNumber' class="w-[350px] lg:w-[400px] xl:w-[500px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" placeholder="rollnumber" value={rollNumber} onChange={(e)=>(setRollNumber(e.target.value))}/>
                    </div>
                    <div class="mb-4 ">
                        <input type="number" id="mobileNumber" name='mobileNumber' class="w-[350px] lg:w-[400px] xl:w-[500px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" placeholder="mobileNumber" value={mobileNumber} onChange={(e)=>(setMobileNumber(e.target.value))}/>
                    </div>
                    <div className='flex flex-col lg:flex-row justify-center items-center gap-3'>
                        <button className='bg-customBlue pl-11 pr-11 pt-2 pb-2 rounded-xl text-white font-bold hover:opacity-55 duration-300 ease-in-out' type='submit'>
                            Log In
                        </button>
                    </div>
                </form>
            
            </div>
        </div>
    </>
  )
}

export default Login