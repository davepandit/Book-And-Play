import React from 'react'
import errorImage from '../assets/jungle-page-not-found-1.png'
import {Link} from 'react-router-dom'

const Error = () => {
  return (
    <>
      <div className='flex flex-col mt-11 justify-center items-center'>
        <div className='text-4xl lg:text-7xl whitespace-nowrap font-bold text-red-600'>
          OOPS!
        </div>
        <div className='mt-7 flex flex-col justify-center items-center'>
          <img src={errorImage} alt="image" />
          <span className='text-center'>return to <Link to='/home'><span className='underline hover:opacity-55'>home</span></Link></span>
        </div>
      </div>
    </>
  )
}

export default Error