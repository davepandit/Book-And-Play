import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useAddSlotsMutation } from '../slice/gameSlice'
import {Vortex} from 'react-loader-spinner'
import Label from '../components/Label'


const AddSlots = () => {
    //coponent level state feel free to use formik in the future
    const [date , setDate] = useState('')
    const [name , setName] = useState('Badminton')
    const [slotNumber , setSlotNumber] = useState(1)
    //the slot number should be a dropdown
    const [startTime , setStartTime] = useState('7AM')
    const [endTime , setEndTime] = useState('8AM')
    const [availableTickets , setAvailableTickets] = useState(12)
    //available tickets means available slots and this should be a dropdown 
    let [slotsInGame , setSlotsInGame] = useState([]) 

    const [addSlots , {isLoading:slotsLoading}] = useAddSlotsMutation()
    
    const saveHandler = () => {
        setSlotsInGame(prevSlotsInGame => [
            ...prevSlotsInGame,
            {
                slotNumber: Number(slotNumber),
                startTime: startTime,
                endTime: endTime,
                availableTickets: Number(availableTickets)
            }
        ])
        //now slotsingame is ready to be sent to the backend
        toast.success('Saved' , {
            autoClose:2000
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await addSlots({
                date:String(date),
                slotsInGame:slotsInGame,
                name:String(name)
            }).unwrap()
            toast.success(`${response?.message || response?.error}`, {
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
        <Label />
        <div className='mt-11 flex flex-col justify-center items-center mb-11'> 
            <div className='text-3xl lg:text-5xl 2xl:text-7xl font-bold whitespace-nowrap '>
                Add Slots
            </div>
            <div className='mt-7'>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-3 justify-center items-center'>
                        <div>
                            <label htmlFor="date" className='font-bold opacity-55'>Enter Today's date:</label>
                            <div className="mb-4 ">
                                <input type="date" id="date" name='date' className="w-[350px] lg:w-[400px] xl:w-[500px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent" value={date} onChange={(e)=>(setDate(e.target.value))}/>
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="" className='font-bold opacity-55'>Enter Game name:</label>
                            <div className="mb-4 relative inline-block w-[350px] lg:w-[400px] xl:w-[500px] ">
                                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent w-full" name='name' value={name} onChange={(e)=>(setName(e.target.value))}>
                                        <option>Badminton</option>
                                        <option>Table Tennis</option>
                                    </select>        
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="" className='font-bold opacity-55'>Enter Slot Number:</label>
                            <div className="mb-4 relative inline-block w-[350px] lg:w-[400px] xl:w-[500px] ">
                                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent w-full" name='slotNumber' value={slotNumber} onChange={(e)=>(setSlotNumber(e.target.value))}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                    </select>        
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="" className='font-bold opacity-55'>Enter start time:</label>
                            <div className="mb-4 relative inline-block w-[350px] lg:w-[400px] xl:w-[500px] ">
                                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent w-full" name='startTime' value={startTime} onChange={(e)=>(setStartTime(e.target.value))}>
                                        <option>7AM</option>
                                        <option>8AM</option>
                                        <option>9AM</option>
                                        <option>10AM</option>
                                        <option>11AM</option>
                                        <option>12PM</option>
                                        <option>1PM</option>
                                        <option>2PM</option>
                                        <option>3PM</option>
                                        <option>4PM</option>
                                    </select>        
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="" className='font-bold opacity-55'>Enter end time:</label>
                            <div className="mb-4 relative inline-block w-[350px] lg:w-[400px] xl:w-[500px] ">
                                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent w-full" name='endTime' value={endTime} onChange={(e)=>(setEndTime(e.target.value))}>
                                        <option>8AM</option>
                                        <option>9AM</option>
                                        <option>10AM</option>
                                        <option>11AM</option>
                                        <option>12PM</option>
                                        <option>1PM</option>
                                        <option>2PM</option>
                                        <option>3PM</option>
                                        <option>4PM</option>
                                        <option>5PM</option>
                                    </select>        
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="" className='font-bold opacity-55'>Enter available slots:</label>
                            <div className="mb-4 relative inline-block w-[350px] lg:w-[400px] xl:w-[500px] ">
                                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent w-full" name='availableTickets' value={availableTickets} onChange={(e)=>(setAvailableTickets(e.target.value))}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>
                                        <option>11</option>
                                        <option>12</option>
                                    </select>        
                            </div>
                        </div>
                        {
                            slotsLoading ? (
                                <div className='justify-center items-center flex'>
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
                        <div className='flex gap-8'>
                            <div>
                                <button className='bg-green-400 pl-11 pr-11 pt-2 pb-2 rounded-xl text-white font-bold hover:opacity-55 duration-300 ease-in-out' type='button' onClick={saveHandler}>Save</button>
                            </div>

                            <div>
                                <button className='bg-green-400 pl-11 pr-11 pt-2 pb-2 rounded-xl text-white font-bold hover:opacity-55 duration-300 ease-in-out' type='submit'>Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default AddSlots