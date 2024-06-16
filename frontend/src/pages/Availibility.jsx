import React, { useEffect, useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom';
import { useCheckAvailiblityQuery } from '../slice/gameSlice';
//loader
import {Vortex} from 'react-loader-spinner'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import { useSelector } from 'react-redux';
import creditsImage from '../assets/3d-business-pile-of-five-golden-dollar-coins.png'



const Availibility = () => {
  //global state 
  const {userInfo} = useSelector((state)=>state.auth)
  //taking the game name from the url 
  const [searchParams , setSearchParams] = useSearchParams()
  //get the game name from the params
  const game = searchParams.get('game')
  const date = searchParams.get('date')
  const navigate = useNavigate()

  //get the hook from the rtk query
  const {data:availibilityData , isLoading , refetch} = useCheckAvailiblityQuery({game , date})
  return (
    <>
      {
        isLoading ? (
          //loader
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
        ) : (
          <div>
            <div className='flex justify-center items-center flex-col gap-5'>
              <div className='text-center mt-6 font-bold text-xl lg:text-5xl 2xl:text-7xl whitespace-nowrap pl-2 pr-2'>
                Add <span className='text-blue-400'>something</span> to your list
              </div>
              <div className='font-bold text-lg items-center flex'>
                Your credits: {userInfo.credits}
                <img src={creditsImage} alt="img" className="w-[20px] h-[21px] inline-block ml-1"/>
              </div>
            </div>
            <div className='mt-11 flex flex-col gap-3 pl-11 pr-11 place-items-center'>
              {
                availibilityData.slots.map((slot , index)=>(
                  <Card slotNumber={slot.slotNumber} startTime={slot.startTime} endTime={slot.endTime} availableTickets={slot.availableTickets} key={index}/>
                ))
              }
            </div>
          </div>
        )
      }
    </>
  )
}

export default Availibility