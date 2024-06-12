import React, { useState } from 'react'
import { GiHamburger } from "react-icons/gi";
import { GiSplitCross } from "react-icons/gi";
//getting the modal state from the global state
import { useSelector , useDispatch } from 'react-redux';
import { openModal , closeModal } from '../slice/modal';

const Header = () => {
  //there is a single source of truth
  //creating an instance of useDispatch
  const dispatch = useDispatch()
  const headerModal = useSelector((state)=>state.modal.headerModal)
  const handleCrossButton = () => {
    dispatch(closeModal())
    console.log('close action', headerModal)
  }

  const handleHamburgerButton = () => {
    dispatch(openModal())
    console.log('open action', headerModal)
  }
  return (
    <div className='text-sm font-bold relative z-20 bg-clip-text text-gray-200 py-8 '>
      <div className='flex justify-between font-montserrat'>
        <div className='text-xl font-bold hover:cursor-pointer hover:opacity-55 duration-300 ease-in-out'>
          BookAndPlay🚀
        </div>
        <div className='flex gap-8 items-center'>
          <span className='hidden lg:block hover:text-gray-400 duration-300 ease-in-out hover:cursor-pointer'>Events/Sports🏏</span>
          <span className='hidden lg:block hover:text-gray-400 duration-300 ease-in-out hover:cursor-pointer'>My Bookings🎫</span>
          <span className='hidden lg:block hover:text-gray-400 duration-300 ease-in-out hover:cursor-pointer'>About Us</span>
          <span className='hidden lg:block hover:text-gray-400 duration-300 ease-in-out hover:cursor-pointer'>Contact Us</span>
          <button className='hidden lg:block bg-white text-black pl-4 pr-4 pt-1 pb-1 rounded-2xl hover:bg-gray-300 duration-300 ease-in-out'>Sign Up</button>
          {
            !headerModal ? (
              //render the hamburger icon
              <div>
                <GiHamburger className='lg:hidden text-xl' onClick={handleHamburgerButton}/>
              </div>
            ) : (
              //render the cross icon
              <div>
                <GiSplitCross className='lg:hidden text-xl relative' onClick={handleCrossButton}/>
                  {/* <div className='absolute top-[80px] h-[300px] right-[-40px] bg-red-500 text-white w-[200px] flex flex-col gap-5 z-50 rounded-lg items-center justify-center pl-3 pr-3 pt-2 pb-2 shadow-gray-900 shadow-md'>
                    <span className='font-bold text-base'>Events/Sports🏏</span>
                    <span className='font-bold text-base'>My Bookings🎫</span>
                    <span className='font-bold text-base'>About Us</span>
                    <span className='font-bold text-base'>Contact Us</span>
                    <button className='font-bold text-base'>Sign Up</button>
                  </div> */}
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Header