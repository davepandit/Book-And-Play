import React from 'react'
import cardImage from '../assets/pexels-saif71-7438732.jpg'

const Card = ({slotNumber , startTime , endTime , availableTickets}) => {
  return (
    <>
        {/* this is the card that will be available on the availibility page  */}
        <div className='rounded-xl flex w-[320px] sm-410:w-[375px] sm-768:w-[700px] h-auto gap-3 lg:relative items-center border border-gray-300 shadow-lg mb-11'>
                {/* image section  */}
                <div className='flex-shrink-0 p-2 border-r border-gray-300'>
                    <img src={cardImage} alt="game image" className='overflow-hidden rounded-l-xl bg-center bg-cover bg-no-repeat w-[190px] h-[127px] lg:w-[200px] lg:h-[133px]'/>
                </div>
                <div className='flex flex-col gap-1 justify-center items-center w-[350px] sm-410:w-[375px] lg:w-[400px] mx-auto'>
                    <div className='text-sm font-bold'>
                        slotNumber: <span className='text-blue-400'>{slotNumber}</span>
                    </div>
                    <div className='text-sm font-bold'>
                        startTime: <span className='text-blue-400'>{startTime}</span>
                    </div>
                    <div className='text-sm font-bold'>
                        endTime: <span className='text-blue-400'>{endTime}</span>
                    </div>
                    <div className='text-sm font-bold'>
                        availableTickets: <span className='text-blue-400'>{availableTickets}</span>
                    </div>
                    <div className=''>
                        <button className='bg-black pl-4 pr-4 pt-1 pb-1 rounded-3xl text-white font-bold hover:opacity-55 duration-300 ease-in-out text-sm'>Book now</button>
                    </div>
                </div>
            </div>
    </>
  )
}

export default Card