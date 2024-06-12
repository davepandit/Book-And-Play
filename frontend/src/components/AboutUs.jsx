import React from 'react'
import aboutImage from '../assets/undraw_team_page_re_cffb (1).svg'

const AboutUs = () => {
  return (
    <>
        <div className='flex flex-col lg:flex-row justify-between gap-11 lg:gap-20 pl-11 pr-11 items-center max-w-[2000px] mx-auto'>
            {/* left section  */}
            <img src={aboutImage} alt="about image" className='w-[400px] h-[400px] xl:w-[500px] xl:h-[500px] 2xl:w-[700px] 2xl:h-[700px]'/>
            {/* right section  */}
            <div className='flex flex-col gap-3'>
                <span className='text-black font-bold text-5xl lg:text-7xl whitespace-nowrap'>About Us🫠</span>
                <span className=' font-bold opacity-55'>
                    We are a team helping you to improve your sporting experience 
                </span>
                <span className='text-3xl font-bold text-black mt-5'>Do you need this?</span>
                <span className='font-bold opacity-55'>The solution came while standing in for around 40 min just in order to get my turn to play. So basically you get to play 45 min but only if you have 40 more min to spare</span>
                <span className='text-3xl font-bold text-black mt-5'>
                    How we are changing this?
                </span>
                <span className='font-bold opacity-55'>
                    Book your slot from your hostels and come 5 min before and enjoy, yeah simple nothing more...
                </span>
            </div>
        </div>
    </>
  )
}

export default AboutUs