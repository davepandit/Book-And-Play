import React, { useEffect, useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom';
import { useCheckAvailiblityQuery } from '../slice/gameSlice';
//loader
import {Vortex} from 'react-loader-spinner'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



const Availibility = () => {
  //taking the game name from the frontend 
  const [searchParams , setSearchParams] = useSearchParams()
  //get the game name from the params
  const game = searchParams.get('game')
  const date = searchParams.get('date')
  const navigate = useNavigate()

  //get the hook from the rtk query
  const {data:availibilityData , isLoading , refetch} = useCheckAvailiblityQuery({game , date})
  return (
    <>
      {
        isLoading ? (
          //loader
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
          <div>
            {game}
            {date}
          </div>
        )
      }
    </>
  )
}

export default Availibility