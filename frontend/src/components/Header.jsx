import React from 'react'

const Header = () => {
  return (
    <div className='text-sm font-bold relative z-20 bg-clip-text text-gray-200 py-8 '>
      <div className='flex justify-between font-montserrat'>
        <div className='text-xl font-bold hover:cursor-pointer hover:opacity-55 duration-300 ease-in-out'>
          BookAndPlay🚀
        </div>
        <div className='flex gap-8 items-center'>
          <span className='hover:text-gray-400 duration-300 ease-in-out hover:cursor-pointer'>Events/Sports🏏</span>
          <span className='hover:text-gray-400 duration-300 ease-in-out hover:cursor-pointer'>My Bookings🎫</span>
          <span className='hover:text-gray-400 duration-300 ease-in-out hover:cursor-pointer'>About Us</span>
          <span className='hover:text-gray-400 duration-300 ease-in-out hover:cursor-pointer'>Contact Us</span>
          <button className='bg-white text-black pl-4 pr-4 pt-1 pb-1 rounded-2xl hover:bg-gray-300 duration-300 ease-in-out'>Sign Up</button>
        </div>
      </div>
    </div>
  )
}

export default Header