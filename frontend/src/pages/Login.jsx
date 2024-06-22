import React from 'react'
import * as Yup from 'yup'
import { useState } from 'react'
import loginImage from '../assets/3d-hygge-isometric-view-of-colleagues-having-meeting.png'
//import hooks provided by  rtk query 
import { useLoginUserMutation } from '../slice/userSlice'
import {toast} from 'react-toastify'
import {useNavigate , Link} from 'react-router-dom'
import {Vortex} from 'react-loader-spinner'
//setting up some details in the local storage for now and later will be moving on to cookies
import { setCredentials } from '../slice/authSlice'
import { useDispatch , useSelector } from 'react-redux'
import Meta from '../components/Meta'



const Login = () => {

    //validation schema
    const validationSchema = Yup.object().shape({
        rollNumber: Yup.string().required('Roll Number is required').matches(/^[0-9]+[A-Z]+[0-9]+$/, 'Roll Number format doesnot match'),
        mobileNumber: Yup.string().required('Mobile Number is required').matches(/^[0-9]{10}$/, 'Mobile Number must be exactly 10 digits and contain only digits'),
        })


    //usenavigate instance
    const navigate = useNavigate()
    //useDispatch instance
    const dispatch = useDispatch()
    const {userInfo} = useSelector((state)=>state.auth)

    //component level states
    const [rollNumber , setRollNumber] = useState('')
    const [mobileNumber , setMobileNumber] = useState()
    const [errors, setErrors] = useState({});

    const [loginUser , {isLoading:loginLoading}] = useLoginUserMutation()

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            //validation result
            await validationSchema.validate({
                rollNumber,
                mobileNumber
              }, { abortEarly: false })

            const response = await loginUser({
                mobileNumber:Number(mobileNumber),
                rollNumber:rollNumber
            }).unwrap()
            dispatch(setCredentials({...response}))
            toast.success('Log In successfull', {
                autoClose:2000
            })
            navigate('/sportslisting')
        } catch (error) {
            // Handle Yup validation errors
            if (error.name === 'ValidationError') {
                const formattedErrors = {};
                error.inner.forEach(err => {
                    formattedErrors[err.path] = err.message;
                });
                console.log('formattedErrors:', formattedErrors)
                setErrors(formattedErrors); // Assuming you have a state for errors
                console.log('errors:', errors)
            } else {
                // Handle other errors (e.g., network errors, server errors)
                toast.error('No such credentials exist', {
                    autoClose: 2000
                });
            }
        }
    }
  return (
    <>
        <Meta title='Login' />
        <div className=' lg:bg-customBlue w-full h-screen flex justify-center lg:justify-between lg:pl-11 lg:pr-11 sm-2000:pl-28 sm-2000:pr-28 items-center'>
            {/* left section  */}
            <img src={loginImage} alt="loginimage" className='w-[400px] h-[334px] 2xl:w-[600px] 2xl:h-[501px] hidden lg:block'/>
            {/* right section  */}
            <div className='lg:absolute lg:right-0 lg:w-1/2 lg:bg-white text-black lg:rounded-l-extra-large h-screen flex flex-col justify-center items-center gap-5'>
                <span className='font-bold text-3xl whitespace-nowrap'>
                    Log In😎
                </span>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 ">
                        <input type="text" id="rollNumber" name='rollNumber' className="w-[350px] lg:w-[400px] xl:w-[500px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" placeholder="rollnumber" value={rollNumber} onChange={(e)=>(setRollNumber(e.target.value))}/>
                        {errors.rollNumber && <p className="text-red-600 font-bold">{errors.rollNumber}</p>}

                    </div>
                    <div className="mb-4 ">
                        <input type="number" id="mobileNumber" name='mobileNumber' className="w-[350px] lg:w-[400px] xl:w-[500px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" placeholder="mobileNumber" value={mobileNumber} onChange={(e)=>(setMobileNumber(e.target.value))}/>
                        {errors.mobileNumber && <p className="text-red-600 font-bold">{errors.mobileNumber}</p>}

                    </div>
                    {
                        loginLoading ? (
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
                    <div className='flex flex-col lg:flex-row justify-center items-center gap-3'>
                        {/* allow the user to click the button only when he has entered both the fields  */}
                        <button className='bg-customBlue pl-11 pr-11 pt-2 pb-2 rounded-xl text-white font-bold hover:opacity-55 duration-300 ease-in-out' type='submit'>
                            Log In
                        </button>
                        <span><span className='font-bold text-sm opacity-55'>Don't have an account </span><Link to='/signup'><span className='underline hover:cursor-pointer hover:opacity-55'>Sign In</span></Link></span>
                    </div>
                </form>
            
            </div>
        </div>
    </>
  )
}

export default Login