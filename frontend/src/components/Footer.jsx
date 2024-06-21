import React from 'react'
import footerImage from '../assets/two-tickets-blue-front-view-isolated-white.png'
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <div className=' rounded-t-3xl pl-11 pr-11 pt-5 pb-5 bg-black text-white'>
        <div className='flex flex-col lg:flex-row gap-3 lg:gap-0 justify-between  items-center'>
          {/* left section  */}
          <div className='flex gap-3 items-center'>
            <img src={footerImage} alt="footer image" className='w-[100px] h-[66px]'/>
            <a href="#"><span className='text-xl font-bold hover:opacity-55 hover:cursor-pointer'>BookAndPlay🚀</span></a>
            
          </div>
          {/* right section  */}
          <div className='flex gap-5 text-4xl'>
            <a href="https://www.instagram.com/codeninja0812/" target="_blank" rel="noopener noreferrer"><FaInstagramSquare className='hover:text-pink-300 hover:cursor-pointer duration-300 ease-in-out'/></a>
            <a href="https://twitter.com/Davepandit0812" target="_blank" rel="noopener noreferrer"><FaSquareXTwitter className='hover:opacity-55 hover:cursor-pointer duration-300 ease-in-out'/></a>
            <a href="https://www.linkedin.com/in/debajyoti-pandit-b921b327b" target="_blank" rel="noopener noreferrer"><FaLinkedin className='hover:text-blue-400 hover:cursor-pointer duration-300 ease-in-out'/></a>
          </div>
        </div>
        <div className='flex justify-center items-center mt-4 lg:mt-0'>
          <span className='font-bold opacity-55'>Made by a developer🧑‍💻</span>
        </div>
      </div>
    </>
  )
}

export default Footer
