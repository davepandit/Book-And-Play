import React from 'react'
import * as Yup from 'yup'
import { useUpdateProfileMutation } from '../slice/userSlice'
import { useSelector , useDispatch } from 'react-redux'
import Label from '../components/Label'
import { setCredentials } from '../slice/authSlice'
import { useState } from 'react'
import { toast } from 'react-toastify'
import {Vortex} from 'react-loader-spinner'


const Profile = () => {
    const {userInfo} = useSelector((state)=>(state.auth))
    const dispatch = useDispatch()
    //component level state 
    const [name , setName] = useState(`${userInfo.name}`)
    const [passingYear , setPassingYear] = useState(Number(userInfo.passingYear))
    const [rollNumber , setRollNumber] = useState(`${userInfo.rollNumber}`)
    const [degree , setDegree] = useState(`${userInfo.degree}`)
    const [mobileNumber , setMobileNumber] = useState(`${userInfo.mobileNumber}`)
    //state for handling errors
    const [errors, setErrors] = useState({});

    const [updateProfile , {isLoading:updateProfileLoading}] = useUpdateProfileMutation()

    // validation schema 
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        passingYear: Yup.number().required('Passing Year is required'),
        rollNumber: Yup.string().required('Roll Number is required').matches(/^[0-9]+[A-Z]+[0-9]+$/, 'Roll Number format doesnot match'),
        degree: Yup.string().required('Degree is required'),
        mobileNumber: Yup
        .string()
        .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
        .required('Mobile number is required'),
      })

    // submit handler 
    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            await validationSchema.validate({
                name,
                passingYear,
                rollNumber,
                degree,
                mobileNumber
              }, { abortEarly: false })

              //send the updated info 
              const response = await updateProfile({
                userId:userInfo._id,
                name:name,
                passingYear:Number(passingYear),
                rollNumber:rollNumber,
                degree:degree,
                mobileNumber:Number(mobileNumber)
              }).unwrap()

              //update the global state and the local storage
              dispatch(setCredentials(response.updatedUserCredentials))

              toast.success(`${response.message}`, {
                autoClose:2000
            })
        } catch (error) {
            // Handle Yup validation errors
            if (error.name === 'ValidationError') {
                const formattedErrors = {};
                error.inner.forEach(err => {
                    formattedErrors[err.path] = err.message;
                });
                setErrors(formattedErrors);
            }else{
                // Handle other errors (e.g., network errors, server errors)
                toast.error(`${error.message}`, {
                    autoClose: 2000
                });
            }
        }
    }
  return (
    <>
        <Label />
        <div className='mt-7 flex flex-col gap-5 items-center pl-11 pr-11'>
            <div className='text-3xl lg:text-5xl 2xl:text-7xl font-bold text-center'>
                My <span className='text-green-500'>Profile</span>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4 ">
                    <input type="text" id="name" name='name' className="w-[350px] lg:w-[400px] xl:w-[500px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Name" value={name} onChange={(e)=>(setName(e.target.value))}/>
                    {/* show the error mssg  */}
                    {errors.name && <p className="text-red-600 font-bold">{errors.name}</p>}
                </div>
                <div className="mb-4 relative inline-block w-[350px] lg:w-[400px] xl:w-[500px] ">
                        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full" name='passingYear' value={passingYear} onChange={(e)=>(setPassingYear(e.target.value))}>
                            <option>2024</option>
                            <option>2025</option>
                            <option>2026</option>
                            <option>2027</option>
                            <option>2028</option>
                        </select>
                        {errors.passingYear && <p className="text-red-600 font-bold">{errors.passingYear}</p>}
                        
                    </div>
                    <div className="mb-4 flex flex-col">
                        <input type="text" id="rollnumber" name='rollNumber' className="w-[350px] lg:w-[400px] xl:w-[500px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="rollNumber" value={rollNumber} onChange={(e)=>(setRollNumber(e.target.value))}/>
                        {errors.rollNumber && <p className="text-red-600 font-bold">{errors.rollNumber}</p>}
                    </div>
                    <div className="mb-4 relative inline-block w-[350px] lg:w-[400px] xl:w-[500px]">
                        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full" name='degree' value={degree} onChange={(e)=>(setDegree(e.target.value))}>
                            <option>B.Tech</option>
                            <option>MBA</option>
                            <option>PHD</option>
                            <option>M.Tech</option>
                        </select>
                        {errors.degree && <p className="text-red-600 font-bold">{errors.degree}</p>}

                    </div>
                    <div className="mb-4 ">
                        <input type="number" id="mobileNumber" name='mobileNumber' className="w-[350px] lg:w-[400px] xl:w-[500px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="mobileNumber" value={mobileNumber} onChange={(e)=>(setMobileNumber(e.target.value))}/>
                        {errors.mobileNumber && <p className="text-red-600 font-bold">{errors.mobileNumber}</p>}

                    </div>
                    {
                            updateProfileLoading ? (
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
                        
                        <button className='bg-green-500 pl-11 pr-11 pt-2 pb-2 rounded-xl text-white font-bold hover:opacity-55 duration-300 ease-in-out' type='submit'>
                            Submit
                        </button>
                    </div>
            </form>
        </div>
    </>
  )
}

export default Profile