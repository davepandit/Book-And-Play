import React from 'react'
import { useGetMyBookingsQuery } from '../slice/bookingSlice'
import {Vortex} from 'react-loader-spinner'
import { useSelector , useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import verifiedImage from '../assets/ikigai-green-check-mark-in-a-circle.png'
import notreportedImage from '../assets/jelly-red-rectangle-with-white-cross.png'
import { useCancelBookingMutation } from '../slice/bookingSlice'
import { setNewCredits } from '../slice/authSlice'
import Label from '../components/Label'
import Meta from '../components/Meta'

const MyBookings = () => {
  const {data:bookingsData , isLoading , refetch} = useGetMyBookingsQuery()
  //taking the uerInfo from the global state 
  const {userInfo} = useSelector((state)=>(state.auth))
  const dispatch = useDispatch()
  const [cancelBooking , {isLoading:cancelLoading}] = useCancelBookingMutation()

  //this method will cancel the booking
  const handleCancelSlot = async(id, slotNumber, date , gameName) => {
    //send the time to the backend if the time send is at least 10 min before the lsot then the slot will be cancelled
    try {
      const response = await cancelBooking({
        cancelRequestTimestamp:Date.now(),
        bookingId:id,
        slotNumber: slotNumber,
        date:date,
        gameName:gameName,
        credits:userInfo.credits
      }).unwrap()
      //update the state and the local storage
      dispatch(setNewCredits(Number(response.newCreditsDoc.credits)))
      refetch()
      toast.success(`${response.message}`, {
        autoClose:2000
      })
    } catch (error) {
      toast.error(`${error.data.message}`, {
        autoClose:2000
      })
    }
  }
  
  
  return (
    <>
      <Meta title='My Bookings' />
      <Label />
      <div className='mt-7 flex flex-col gap-5 items-center pl-11 pr-11'>
        <div className='text-3xl lg:text-5xl 2xl:text-7xl font-bold text-center'>
          My <span className='text-customPurple'>Bookings</span>
        </div>
        {
          isLoading ? (
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
            // card element transparent 
            <div className='grid grid-cols-1 md:grid-cols-3 gap-11 mt-7'>
              {
                bookingsData?.map((individualDoc , index)=>(
              
                  <div className='w-[300px] h-auto rounded-xl p-3 shadow-xl flex flex-col gap-2 justify-center items-center border border-gray-200 relative' key={index}>
                    <span className='text-base font-bold'>SportName: <span className='text-customPurple'>{individualDoc.sportName}</span></span>
                    <span className='text-base font-bold'>SlotNumber: <span className='text-customPurple'>{individualDoc.slotNumber}</span></span>
                    <span className='text-base font-bold'>StartTime: <span className='text-customPurple'>{individualDoc.startTime}</span></span>
                    <span className='text-base font-bold'>EndTime: <span className='text-customPurple'>{individualDoc.endTime}</span></span>
                    <button className='pl-2 pr-2 pt-1 pb-1 bg-black text-white font-bold rounded-3xl text-sm hover:opacity-55 duration-300 ease-in-out z-50' onClick={()=>(handleCancelSlot(individualDoc._id , individualDoc.slotNumber, individualDoc.date , individualDoc.sportName))} disabled={individualDoc.reported}>Cancel Booking</button>
                    {
                      individualDoc.reported ? (
                        <img src={verifiedImage} alt="reported" className='absolute w-[150px] h-[148px] opacity-30'/>
                      ) : (
                        <img src={notreportedImage} alt="notreported" className='absolute w-[150px] h-[117px] opacity-30'/>
                      )
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

export default MyBookings