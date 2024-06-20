import React from 'react'
import { useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const Faq = () => {
    const [open , setOpen] = useState(-1)

    const handleOpen = (index) => {
        setOpen(index == open ? -1 : index)
    }

    //faqs 
    const faqs = [
        {
            question:'How can I book a ticket?',
            answer:'Just click on the Grab Ticket button and you will be directed to the listings page just select the date and then see availibilty and book a slot that fits you.'
        },
        {
            question:'Can I cancel my booking?',
            answer:'Yes, you can cancel your booking but you should make the request at least 10 min before starting of the slot.'  
        },
        {
            question:'What if I can\'t report for my booked slot?',
            answer:'If you can\'t report for your slot then 5 credits will be cancelled from your account but if you cancel your slot before time then no credits will be cancelled rather you will get your credits refunded.'  
        },
        {
            question:'Can\'t I book as many slots as possible?',
            answer:'No when you Login then we assign 20 credits to your account and once you book a slot 5 credits are deducted.'  
        },
        {
            question:'How do I view my booking history?',
            answer:'You can see your booking history in the my bookings tab if you are on a laptop then that will be visible to you in the header and if on a mobile then click on the hamburger icon and you will find that.'  
        },
        {
            question:'How can I report a bug?',
            answer:'You can report a bug or a recommend a feature by clicking on the join button in the Contact Us section, once you click on the button you can join a group which is made by the developers of this app and there you can raise your query.'  
        },
        {
            question:'How can I update my profile information?',
            answer:'If you are on a laptop then you can click on your name being displayed on the header and there a modal will come where you can click on the Profile and can modify it accordingly.'  
        }
    ]
  return (
    <>
        <div className='flex flex-col gap-7  pl-11 pr-11 items-center max-w-[2000px] mx-auto mb-20'>
            <span className='text-black font-bold text-5xl lg:text-7xl'>FAQ</span>
            

            {
                faqs.map((faq , index)=>(
                    <div className='flex flex-col gap-3 w-[330px] sm-375:w-[375px] lg:w-[600px] h-auto' key={index}>
                        <div className='flex justify-between gap-7 lg:gap-20 items-center'>
                            <span className='text-xl font-bold opacity-90'>{faq.question}</span>
                            {
                                open == index ? (
                                <span className='text-xl opacity-90 hover:cursor-pointer' onClick={()=>handleOpen(index)}><ImCross /></span>
                                ) : (
                                <span className='text-xl opacity-90 hover:cursor-pointer' onClick={()=>handleOpen(index)}><FaPlus /></span>
                                )
                            }
                        </div>
                        {
                            open == index ? (
                                <span className='text-base font-bold opacity-55'>
                                    {faq.answer}
                                </span>
                            ) : null
                        }
                    </div>
                ))
            }
        </div>
    </>
  )
}

export default Faq