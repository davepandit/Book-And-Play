import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Label = () => {

    const {userInfo} = useSelector((state)=>state.auth)
  return (
    <>
        <div className='fixed top-1/2 left-0 z-50'>
            <Link to='/home'><div className='rounded-r-3xl w-[90px] lg:w-[100px] h-auto pl-4 pr-4 pt-2 pb-2 hover:scale-110 duration-300 ease-in-out  bg-red-500 hover:cursor-pointer'>
                <span className='text-sm lg:text-lg font-semibold text-white'>Home</span>
            </div></Link>

            <Link to='/profile'><div className='rounded-r-3xl w-[90px] lg:w-[115px] h-auto pl-4 pr-4 pt-2 pb-2 hover:scale-110 duration-300 ease-in-out  bg-blue-500 hover:cursor-pointer mt-1 lg:mt-3'>
                <span className='text-sm lg:text-lg font-semibold text-white'>Profile</span>
            </div></Link>
            
            <Link to='/sportslisting'><div className='rounded-r-3xl w-[90px] lg:w-[120px] h-auto pl-4 pr-4 pt-2 pb-2 hover:scale-110 duration-300 ease-in-out bg-customPurple hover:cursor-pointer mt-1 lg:mt-3'>
                <span className='text-sm lg:text-lg font-semibold text-white'>Sports</span>
            </div></Link>

            {
                userInfo.isAdmin ? (
                    <Link to='/addslots'><div className='rounded-r-3xl w-[100px] lg:w-[140px] h-auto pl-4 pr-4 pt-2 pb-2 hover:scale-110 duration-300 ease-in-out bg-blue-500 hover:cursor-pointer mt-1 lg:mt-3'>
                        <span className='text-sm lg:text-lg font-semibold text-white'>Add Slots</span>
                    </div></Link>
                ) : null
            }

            <Link to='/mybookings'><div className='rounded-r-3xl w-[100px] lg:w-[180px] h-auto pl-4 pr-4 pt-2 pb-2 hover:scale-110 duration-300 ease-in-out bg-green-500 hover:cursor-pointer mt-1 lg:mt-3'>
                <span className='text-sm lg:text-lg font-semibold text-white'>Bookings</span>
            </div></Link>

           
        </div>
    </>
)
}

export default Label