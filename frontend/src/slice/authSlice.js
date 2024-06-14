import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        //after succesfull login setting all these details into the global state
        setCredentials:(state , action)=>{
            state.userInfo = action.payload
            //settings things into the local storage only allows to get started from where i left 
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        },
        removeCredentials:(state , action)=>{
            state.userInfo = null
            localStorage.removeItem('userInfo')
        }
    }
})


export const {setCredentials , removeCredentials} = authSlice.actions
export default authSlice.reducer