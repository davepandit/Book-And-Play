import React from "react";
import Header from "../components/Header";
import { FaArrowRight } from "react-icons/fa";
import ticket from '../assets/realistic-ticket-mockup-design.png'
import singleTicket from '../assets/two-old-movie-tickets-isolated.png'
import oldTicket from '../assets/old-used-brown-torn-ticket-stub-isolated.png'
//getting the state of the modal from the global state
import { useSelector , useDispatch} from "react-redux";
import { useEffect , useRef } from "react";
import { closeModal } from "../slice/modal";

const Home = () => {
  const headerModal = useSelector((state)=>state.modal.headerModal)
  //dispatch instance
  const dispatch = useDispatch()
  //reference variable
  const modalRef = useRef(null)

  //functionality to close the modal when clicked outside it 
  const handleClickOutsideModal = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      // Click occurred outside the modal, close the modal
      dispatch(closeModal());
    }
  };

  useEffect(() => {
    // Add event listener when modal is open
    if (headerModal) {
      document.addEventListener('mousedown', handleClickOutsideModal);
    } else {
      // Remove event listener when modal is closed
      document.removeEventListener('mousedown', handleClickOutsideModal);
    }
    // Cleanup function to remove event listener when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideModal);
    };
  }, [headerModal , dispatch]);
  return (
    <>
      <div className="h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
        {/* this is the header which is positioned as absolute  */}
        <div className="absolute top-[-10px] left-[50px] right-[50px] [mask-image:radial-gradient]">
          <Header />
        </div>
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="text-3xl sm:text-5xl 2xl:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 flex flex-col-reverse mt-28 lg:mt-0 lg:flex-row justify-between gap-8 items-center">
          <div>
            <div className="text-center lg:text-left pl-1 pr-1">
            Get in the Game: <br />Book Your <br />Sports Session Effortlessly!
            </div>
            <div className="mt-3 sm-410:mt-9 2xl:mt-16 flex gap-3 items-center justify-center lg:justify-start">
              <button className="text-sm 2xl:text-lg 2xl:pl-6 2xl:pr-6 2xl:pt-3 2xl:pb-3 hover:bg-gray-300 duration-300 ease-in-out bg-white text-black rounded-3xl pl-4 pr-4 pt-2 pb-2">Grab Your</button>
              <img src={singleTicket} alt="ticket image" className="w-[100px] h-[66px] 2xl:w-[150px] 2xl:h-[100px]"/>
            </div>
            {/* conditionaly to be rendered  */}
            {headerModal ? 
            <div className='absolute top-[-27px] h-[300px] right-[11px] bg-red-500 text-white w-[200px] flex flex-col gap-5 z-50 rounded-lg items-center justify-center pl-3 pr-3 pt-2 pb-2 shadow-gray-900 shadow-md' ref={modalRef}>
                    <span className='font-bold text-base'>Events/Sports🏏</span>
                    <span className='font-bold text-base'>My Bookings🎫</span>
                    <span className='font-bold text-base'>About Us</span>
                    <span className='font-bold text-base'>Contact Us</span>
                    <button className='font-bold text-base'>Sign Up</button>
            </div>
            : null
            }
          </div>
          <div>
            <img src={ticket} alt="ticket image" className="sm-375:w-[300px] sm-375:[300px] sm-410:w-[400px] sm-410:h-[400px] 2xl:w-[500px] 2xl:h-[500px] z-20"/>
          </div>
        </div>
        <div className="absolute bottom-[-70px] lg:bottom-[-140px] text-white opacity-55">
          <img src={oldTicket} alt="ticket image" className="w-[200px] h-[133px] lg:w-[400px] lg:h-[266px]"/>
        </div>
        </div>
    </>
  );
}
export default Home