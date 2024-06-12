import React from 'react'
import contactUsImage from '../assets/undraw_contact_us_re_4qqt.svg'

const ContactUs = () => {
  return (
    <>
        <div className='flex flex-col lg:flex-row justify-between gap-7 lg:gap-20 pl-11 pr-11 items-center max-w-[2000px] mx-auto'>
            
            {/* left section  */}
            <div className='flex flex-col gap-3 flex-start'>
                <span className='text-black font-bold text-5xl lg:text-7xl whitespace-nowrap'>Contact Us📩</span>
                <span className=' font-bold opacity-55'>
                    Join this group and suggest iprovements, If you notice some bugs feel free to join and report 
                </span>
                <a href="https://www.awwwards.com/inspiration/about-us-von-lyncker-senior-advisory" target='blank'><button className='bg-black text-white pl-4 pr-4 pt-2 pb-2 rounded-3xl font-bold mt-5 hover:bg-gray-600 duration-300 ease-in-out'>Join</button></a>
            </div>
            {/* right section  */}
            <img src={contactUsImage} alt="contact us image" className='w-[400px] h-[400px] xl:w-[500px] xl:h-[500px] 2xl:w-[700px] 2xl:h-[700px]'/>

        </div>
    </>
  )
}

export default ContactUs