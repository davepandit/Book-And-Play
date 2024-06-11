import React from "react";
import Header from "../components/Header";
import { FaArrowRight } from "react-icons/fa";
import ticket from '../assets/realistic-ticket-mockup-design.png'
import singleTicket from '../assets/two-old-movie-tickets-isolated.png'

const Home = () => {
  return (
    <>
      <div className="h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
        {/* this is the header which is positioned as absolute  */}
        <div className="absolute top-[-10px] left-[50px] right-[50px] [mask-image:radial-gradient]">
          <Header />
        </div>
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="text-3xl sm:text-5xl 2xl:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 flex justify-between gap-8 items-center">
          <div>
            <div>
            Get in the Game: <br />Book Your <br />Sports Session Effortlessly!
            </div>
            <div className="mt-9 2xl:mt-16 flex gap-3 items-center">
              <img src={singleTicket} alt="ticket image" className="w-[100px] h-[66px] 2xl:w-[150px] 2xl:h-[100px]"/>
              <button className="text-sm 2xl:text-lg 2xl:pl-6 2xl:pr-6 2xl:pt-3 2xl:pb-3 hover:bg-gray-300 duration-300 ease-in-out bg-white text-black rounded-3xl pl-4 pr-4 pt-2 pb-2">Grab Yours</button>
            </div>
          </div>
          <div>
            <img src={ticket} alt="ticket image" className="w-[400px] h-[400px] 2xl:w-[500px] 2xl:h-[500px]"/>
          </div>
        </div>
        
        </div>
    </>
  );
}
export default Home