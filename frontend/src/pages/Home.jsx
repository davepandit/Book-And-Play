import React from "react";
import Header from "../components/Header";
import Footer from '../components/Footer'
import ticket from '../assets/realistic-ticket-mockup-design.png'
import singleTicket from '../assets/two-old-movie-tickets-isolated.png'
import oldTicket from '../assets/old-used-brown-torn-ticket-stub-isolated.png'
//getting the state of the modal from the global state
import { useSelector , useDispatch} from "react-redux";
import { useEffect , useRef } from "react";
import { closeModal } from "../slice/modalSlice";
import AboutUs from "../components/AboutUs";
import ContactUs from "../components/ContactUs";
import { Link , useNavigate } from "react-router-dom";
import creditsImage from '../assets/3d-business-pile-of-five-golden-dollar-coins.png'
//import thr logout hook provided by the RTK query 
import { useLogoutUserMutation } from "../slice/userSlice";
import {toast} from 'react-toastify'
//remove user credentials from auth to remove from the global state and the local storage
import { removeCredentials } from "../slice/authSlice";

const Home = () => {

  const navigate = useNavigate()
  const headerModal = useSelector((state)=>state.modal.headerModal)
  //get the profileModal from the global state 
  const profileModal = useSelector((state)=>state.modal.profileModal)
  //getting the userinfo from the global state
  const {userInfo} = useSelector((state)=>state.auth)
  //dispatch instance
  const dispatch = useDispatch()
  //reference variable
  const modalRef = useRef(null)
  //lout hook
  const [logoutUser , {isLoading:logoutLoading}] = useLogoutUserMutation()

  //functionality to close the modal when clicked outside it 
  const handleClickOutsideModal = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      // Click occurred outside the modal, close the modal
      dispatch(closeModal());
    }
  };

  //logout functionality
  const handleLogout = async() => {
    try {
      const response = await logoutUser().unwrap()
      //remove from the global state and the local storage
      dispatch(removeCredentials())
      //succesfull log out and userInfo deleted from the global state and the localstorage
      toast.success(`${response.message}` , {
        autoClose:2000
      })
    } catch (error) {
      toast.error(`${error.message}`,{
        autoClose:2000
      })
    }
  }

  // add slots for admin 
  const handleAddSlots = () => {
    navigate('/addslots')
  }

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
              <Link to='/sportslisting'><button className="text-sm 2xl:text-lg 2xl:pl-6 2xl:pr-6 2xl:pt-3 2xl:pb-3 hover:bg-gray-300 duration-300 ease-in-out bg-white text-black rounded-3xl pl-4 pr-4 pt-2 pb-2">Grab Your</button></Link>
              <img src={singleTicket} alt="ticket image" className="w-[100px] h-[66px] 2xl:w-[150px] 2xl:h-[100px]"/>
            </div>
            {/* conditionaly to be rendered  */}
            {headerModal ? 
            <div className='absolute top-[-27px] h-[300px] right-[11px] bg-red-500 text-white w-[200px] flex flex-col gap-5 z-50 rounded-lg items-center justify-center pl-3 pr-3 pt-2 pb-2 shadow-gray-900 shadow-md' ref={modalRef}>
                    <Link to='/sportslisting'><span className='font-bold text-base block'>Events/Sports🏏</span></Link>
                    <Link to='/mybookings'><span className='font-bold text-base block'>My Bookings🎫</span></Link>
                    <a href="#about"><span className='font-bold text-base block' >About Us</span></a>
                    <a href="#contact"><span className='font-bold text-base block'>Contact Us</span></a>
                    {
                      userInfo && !userInfo.isAdmin ? (
                        <div className="flex flex-col gap-3 justify-center items-center">
                          <span className='font-bold text-base'>{userInfo.name.toUpperCase()}</span>
                          <span className="font-bold text-base" onClick={handleLogout}>
                            Logout
                          </span>
                          <span className="font-bold text-base">
                            {userInfo.credits}
                            <img src={creditsImage} alt="img" className="w-[20px] h-[21px] inline-block ml-1"/>
                          </span>
                        </div>
                      ) : (
                        <Link to='/signup'><div className="flex justify-center items-center"><button className='font-bold text-base'>Sign Up</button></div></Link>
                      )
                    }
                    {
                      userInfo && userInfo.isAdmin ? (
                          <span className="font-bold text-base" onClick={handleAddSlots}>
                            Add slots
                          </span>
                      ) : null
                    }
                    
            </div>
            : null
            }
            {
              profileModal && userInfo ? (
                <div className='hidden lg:flex absolute top-[-1px] right-[-40px] bg-red-500 text-white w-[200px] flex-col gap-5 z-50 rounded-lg items-center justify-center pl-3 pr-3 pt-2 pb-2 shadow-gray-900 shadow-md'>
                  <span className='font-bold text-sm hover:cursor-pointer hover:opacity-55'>Profile</span>
                  <span className='font-bold text-sm hover:cursor-pointer hover:opacity-55' onClick={handleLogout}>Logout</span>
                  {
                    userInfo.isAdmin ? (
                      <Link to='/addslots'><span className="font-bold text-sm hover:opacity-55 block">
                        Add slots
                      </span>
                      </Link>
                    ) : (
                      <span className='font-bold text-sm hover:opacity-55'>{userInfo.credits}
                      <img src={creditsImage} alt="img" className="w-[20px] h-[21px] inline-block ml-1"/></span>
                    )
                  }
                  
                </div>
              ) : null
            }
          </div>
          <div>
            <img src={ticket} alt="ticket image" className="sm-375:w-[300px] sm-375:[300px] sm-410:w-[400px] sm-410:h-[400px] sm-768:w-[500px] sm-768:h-[500px] sm-820:w-[600px] sm-820:h-[600px] lg:w-[400px] lg:h-[400px] 2xl:w-[700px] 2xl:h-[700px] z-20"/>
          </div>
        </div>
        <div className="absolute bottom-[-70px] lg:bottom-[-140px] text-white opacity-55">
          <img src={oldTicket} alt="ticket image" className="w-[200px] h-[133px] lg:w-[400px] lg:h-[266px]"/>
        </div>
        </div>
        <div className="mt-16 lg:mt-28" id='about'>
          <AboutUs />
        </div>
        <div className="mt-16 lg:mt-20" id='contact'>
          <ContactUs />
        </div>
        <Footer />
    </>
  );
}
export default Home