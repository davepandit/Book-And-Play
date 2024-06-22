// this page is for admin 

import React, { useState } from 'react'
import { useGetallSlotsQuery , useMarkasReportedMutation , useMarkNotReportedMutation } from '../slice/bookingSlice'
import {Vortex} from 'react-loader-spinner'
import verifiedImage from '../assets/ikigai-green-check-mark-in-a-circle.png'
import notreportedImage from '../assets/jelly-red-rectangle-with-white-cross.png'
import { toast } from 'react-toastify'
import { setNewCredits } from '../slice/authSlice'
import { useDispatch } from 'react-redux'
import Meta from '../components/Meta'
import Label from '../components/Label'




const AllSlotsListing = () => {
  const {data:allSlotsData , isLoading:allSlotsLoading , refetch} = useGetallSlotsQuery()
  const [markasReported , {isLoading:reportedLoading}] = useMarkasReportedMutation()
  const [markNotReported , {isLoading:notreportedLoading}] = useMarkNotReportedMutation()
  const dispatch = useDispatch()

  //this method will mark the candidate as reported
  const handleReported = async(id) => {
    try {
      const response = await markasReported({
        _id:id
      }).unwrap()
      refetch()
      toast.success(`${response.message}` , {
        autoClose:2000
      })
    } catch (error) {
      toast.error(`${error.message}` , {
        autoClose:2000
      })
    }
  }

  //not reported handler
  const handleNotReported = async(id) => {
    try {
      const response = await markNotReported({
        _id:id
      }).unwrap()
      refetch()
      dispatch(setNewCredits(Number(response.updatedCreditsUser.credits)))
      toast.success(`${response.message}` , {
        autoClose:2000
      })
    } catch (error) {
      toast.error(`${error.message}` , {
        autoClose:2000
      })
    }
  }
  return (
    <>
        <Meta title='All Slots | Admin' />
        <Label />
        <div className='mt-7 flex flex-col gap-5 items-center pl-11 pr-11'>
            <div className='text-3xl lg:text-5xl 2xl:text-7xl font-bold text-center'>
            All <span className='text-customPurple'>Bookings</span>
            </div>
            {
                allSlotsLoading ? (
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
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-11 mt-7'>
                        {
                            allSlotsData.map((individualDoc , index)=>(
                                <div className='w-[300px] h-auto rounded-xl p-3 shadow-xl flex flex-col gap-2 justify-center items-center border border-gray-200 relative' key={index}>
                                    <span className='text-base font-bold'>SportName: <span className='text-customPurple'>{individualDoc.sportName}</span></span>
                                    <span className='text-base font-bold'>SlotNumber: <span className='text-customPurple'>{individualDoc.slotNumber}</span></span>
                                    <span className='text-base font-bold'>StartTime: <span className='text-customPurple'>{individualDoc.startTime}</span></span>
                                    <span className='text-base font-bold'>EndTime: <span className='text-customPurple'>{individualDoc.endTime}</span></span>
                                    <div className='flex gap-4'>
                                      <button className='pl-2 pr-2 pt-1 pb-1 bg-black text-white font-bold rounded-3xl text-sm hover:opacity-55 duration-300 ease-in-out z-50' disabled={individualDoc.reported} onClick={()=>handleReported(individualDoc._id)}>Reported</button>
                                      <button className='pl-2 pr-2 pt-1 pb-1 bg-black text-white font-bold rounded-3xl text-sm hover:opacity-55 duration-300 ease-in-out z-50' disabled={individualDoc.reported} onClick={()=>(handleNotReported(individualDoc._id))}>Not Reported</button>
                                    </div>
                                    {
                                        individualDoc.reported ? (
                                            <img src={verifiedImage} alt="reported" className='absolute w-[150px] h-[148px] opacity-30'/>
                                        ) : (
                                          <img src={notreportedImage} alt="notreported" className='absolute w-[150px] h-[117px] opacity-30'/>
                                        )
                                    }
                                    {
                                        allSlotsLoading ? (
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
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    </>
  )
}

export default AllSlotsListing