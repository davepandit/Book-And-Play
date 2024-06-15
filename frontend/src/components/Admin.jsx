// here all the routes that the admin can access 
import React from 'react'
import { Outlet , Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Admin = () => {

    const {userInfo} = useSelector((state)=>state.auth)
  return (
    <>
        {userInfo.isAdmin ? (<Outlet />) : (<Navigate to='/error' replace />)}
    </>
  )
}

export default Admin