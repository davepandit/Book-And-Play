import React from 'react'
import heroImage from '../assets/pexels-robert-hernandez-villalta-35224-128457.jpg'
import badmintonImage from '../assets/3d-fluency-shuttlecock.png'
import ttImage from '../assets/3d-fluency-ping-pong.png'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Label from '../components/Label'
import Meta from '../components/Meta'

const SportsListing = () => {
    const [date , setDate] = useState()
    const navigate = useNavigate()
    const handleBadmintonAvailbility = () => {
        navigate(`/availibility?game=Badminton&date=${date}`)
    }

    const handleTTAvailbility = () => {
        navigate(`/availibility?game=Table Tennis&date=${date}`)
    }
    //date handler
    const DateHandler = (e) => {
        setDate(e.target.value)
        toast.success('Date added' , {
            autoClose:2000
        })
    }
  return (
    <>
        <Meta title='Sports | Book Yours' />
        <Label />
        <div className='bg-black'>
            {/* img section  */}
            <img src={heroImage} alt="hero image" className='w-full h-[230px] sm-768:h-[319px]  sm-820:h-[700px] lg:h-[700px] xl:h-screen opacity-30 bg-center bg-no-repeat bg-cover'/>
            <div className='absolute w-full sm-768:h-[319px] h-[230px] sm-820:h-[700px] xl:h-full sm-768:text-4xl sm-820:text-7xl lg:text-7xl text-white font-bold xl:text-7xl 2xl:text-9xl top-0 flex flex-col gap-2 justify-center items-center '>
                <span>Get in the Game</span>
                <span>Book Tickets for</span>
                <span>your sport</span>            
            </div>
        </div>
        {/* sports listing  */}
        <div className='flex flex-col gap-5 mt-11 justify-center items-center mb-11'>
            {/* new section added  */}
            <div className='text-3xl lg:text-5xl 2xl:text-7xl text-center font-bold'>
              Search <span className='text-green-400'>slots</span> by date
            </div>
            {/* here goes the input box for selecting date */}
            <div className='flex flex-col gap-3 justify-center items-center'>
                <label htmlFor="date" className='font-bold opacity-55'>Enter Today's date:</label>
                <div className="mb-4 ">
                    <input type="date" id="date" name='date' className="w-[350px] lg:w-[400px] xl:w-[500px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent" value={date} onChange={(e)=>DateHandler(e)} />
                </div>
            </div>
            <div className='rounded-xl flex w-[320px] sm-410:w-[375px] sm-768:w-[700px] h-auto gap-3 lg:relative items-center border border-gray-300 shadow-lg'>
                {/* image section  */}
                <div className='flex-shrink-0 p-2 border-r border-gray-300'>
                    <img src={badmintonImage} alt="game image" className='overflow-hidden rounded-l-xl bg-center bg-cover bg-no-repeat w-[150px] h-auto'/>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <div className='font-bold text-xl text-black md:ml-11'>
                        Badminton
                    </div>
                    <div className='flex-grow overflow-hidden rounded-r-xl p-2 md:absolute md:right-[40px] sm-820:right-[80px]'>
                        <button className="text-sm 2xl:text-lg 2xl:pl-6 2xl:pr-6 2xl:pt-3 2xl:pb-3 hover:bg-gray-300 duration-300 ease-in-out bg-black text-white font-bold rounded-3xl pl-4 pr-4 pt-2 pb-2" onClick={handleBadmintonAvailbility} disabled={!date}>See Availability</button> 
                    </div>
                </div>
            </div>

            <div className='rounded-xl flex w-[320px] sm-410:w-[375px] sm-768:w-[700px] h-auto gap-3 lg:relative items-center border border-gray-300 shadow-lg'>
                {/* image section  */}
                <div className='flex-shrink-0 p-2 border-r border-gray-300'>
                    <img src={ttImage} alt="game image" className='overflow-hidden rounded-l-xl bg-center bg-cover bg-no-repeat w-[150px] h-auto'/>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <div className='font-bold text-xl text-black md:ml-11'>
                        Table Tennis
                    </div>
                    <div className='flex-grow overflow-hidden rounded-r-xl p-2 md:absolute md:right-[40px] sm-820:right-[80px]'>
                        <button className="text-sm 2xl:text-lg 2xl:pl-6 2xl:pr-6 2xl:pt-3 2xl:pb-3 hover:bg-gray-300 duration-300 ease-in-out bg-black text-white font-bold rounded-3xl pl-4 pr-4 pt-2 pb-2" onClick={handleTTAvailbility} disabled={!date}>See Availability</button> 
                    </div>
                </div>
            </div>
        </div>
        
    </>
  )
}

export default SportsListing