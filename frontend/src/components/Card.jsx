import React, { useState } from 'react'
import cardImage from '../assets/pexels-saif71-7438732.jpg'
import cardAnotherImage from '../assets/pexels-ingo-569986.jpg'
import { useBookSlotMutation } from '../slice/bookingSlice'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { setNewCredits } from '../slice/authSlice'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import {Vortex} from 'react-loader-spinner'
import { useCheckAvailiblityQuery } from '../slice/gameSlice'


const Card = ({slotNumber , startTime , endTime , availableTickets , game , date}) => {
    const dispatch = useDispatch()
    const [gameName , setGameName] = useState(game)
    const [bookSlot , {isLoading:bookSlotLoading}] = useBookSlotMutation()
    const {userInfo} = useSelector((state)=>state.auth)
    const {data:availibilityData , isLoading , refetch} = useCheckAvailiblityQuery({game , date})

    const bookSlotHandler = async() => {
        //send the slots number to the backend so that the available tickets field can be refreshed
        try {
            //check for the credits before booking the slot
            if(userInfo.credits < 5){
                toast.error('You don\'t have sufficient credits',{autoClose:2000})
                return
            }

            const response = await bookSlot({
                sportName:game,
                credits:Number(userInfo.credits),
                slotNumber:slotNumber,
                availableTickets:Number(availableTickets),
                startTime:startTime,
                endTime:endTime,
                date:date,
                timeStamp:Date.now()
            }).unwrap()
            //update the state 
            dispatch(setNewCredits(Number(response.newCredits)))
            refetch()
            toast.success(`${response.message}`, {
                autoClose:2000
            })
        } catch (error) {
            toast.error(`${error.data.message}` , {
                autoClose:2000
            })
        }
    }
  return (
    <>
        {/* this is the card that will be available on the availibility page  */}
        <div className='rounded-xl flex w-[320px] sm-410:w-[375px] sm-768:w-[700px] h-auto gap-3 lg:relative items-center border border-gray-300 shadow-lg mb-11'>
                {/* image section  */}
                {
                    gameName == 'Badminton' ? (
                        <div className='flex-shrink-0 p-2 border-r border-gray-300'>
                            <img src={cardImage} alt="game image" className='overflow-hidden rounded-l-xl bg-center bg-cover bg-no-repeat w-[190px] h-[127px] lg:w-[200px] lg:h-[133px]'/>
                        </div>
                    ) : (
                        <div className='flex-shrink-0 p-2 border-r border-gray-300'>
                            <img src={cardAnotherImage} alt="game image" className='overflow-hidden rounded-l-xl bg-center bg-cover bg-no-repeat w-[190px] h-[127px] lg:w-[200px] lg:h-[133px]'/>
                        </div>
                    )
                }
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
                    {
                        bookSlotLoading ? (
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
                    <div className=''>
                        <button className='bg-black pl-4 pr-4 pt-1 pb-1 rounded-3xl text-white font-bold hover:opacity-55 duration-300 ease-in-out text-sm' onClick={bookSlotHandler}>Book now</button>
                    </div>
                </div>
            </div>
    </>
  )
}

export default Card