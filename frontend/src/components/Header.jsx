import React, { useState } from 'react'
import { GiHamburger } from "react-icons/gi";
import { GiSplitCross } from "react-icons/gi";
//getting the modal state from the global state
import { useSelector , useDispatch } from 'react-redux';
import { openModal , closeModal , openProfileDropdown , closeProfileDropdown } from '../slice/modalSlice';
import { Link } from 'react-router-dom';
import { IoIosArrowDropupCircle } from "react-icons/io";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const Header = () => {
  //there is a single source of truth
  //creating an instance of useDispatch
  const dispatch = useDispatch()
  const headerModal = useSelector((state)=>state.modal.headerModal)
  //profile modal
  const profileModal = useSelector((state)=>state.modal.profileModal)
  const {userInfo} = useSelector((state)=>(state.auth))
  const handleCrossButton = () => {
    dispatch(closeModal())
    console.log('close action', headerModal)
  }

  const handleHamburgerButton = () => {
    dispatch(openModal())
  }
  const handleProfileModal = () => {
    if(profileModal){
      dispatch(closeProfileDropdown())
    }else{
      dispatch(openProfileDropdown())
    }
  }
  return (
    <div className='text-sm font-bold relative z-20 bg-clip-text text-gray-200 py-8 '>
      <div className='flex justify-between font-montserrat'>
        <div className='text-xl font-bold hover:cursor-pointer hover:opacity-55 duration-300 ease-in-out whitespace-nowrap'>
          BookAndPlay🚀
        </div>
        <div className='flex gap-3 lg:gap-5 xl:gap-8 items-center'>
          <Link to='/sportslisting'><span className='hidden lg:block hover:text-gray-400 duration-300 ease-in-out hover:cursor-pointer'>Events/Sports🏏</span></Link>
          {
            userInfo && userInfo.isAdmin ? (
              <Link to='/allslotslisting'><span className='hidden lg:block hover:text-gray-400 duration-300 ease-in-out hover:cursor-pointer'>All Bookings🎫</span></Link>
            ) : (
              <Link to='/mybookings'><span className='hidden lg:block hover:text-gray-400 duration-300 ease-in-out hover:cursor-pointer'>My Bookings🎫</span></Link>
            )
          }
          <a href="#about"><span className='hidden lg:block hover:text-gray-400 duration-300 ease-in-out hover:cursor-pointer'>About Us</span></a>
          <a href="#contact"><span className='hidden lg:block hover:text-gray-400 duration-300 ease-in-out hover:cursor-pointer'>Contact Us</span></a>
          {
            userInfo ? (
              <div className='lg:flex gap-1 items-center hover:cursor-pointer hover:opacity-55 hidden' onClick={handleProfileModal}>
                <span className='hover:text-gray-400 duration-300 ease-in-out hover:cursor-pointer'>{userInfo.name}😎</span>
                {
                  !profileModal ? (
                    <IoIosArrowDropdownCircle />
                  ) : (
                    <IoIosArrowDropupCircle />
                  ) 
                }
              </div>
              ) : (
                <Link to='/signup'><button className='hidden lg:block bg-white text-black pl-4 pr-4 pt-1 pb-1 rounded-2xl hover:bg-gray-300 duration-300 ease-in-out'>Sign Up</button></Link>
                )
          }
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
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Header