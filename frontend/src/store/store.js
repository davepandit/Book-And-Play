import { configureStore } from "@reduxjs/toolkit";
import modalHandleReducer from '../slice/modalSlice'
import { apiSlice } from "../slice/apiSlice";
import authSliceReducer from '../slice/authSlice'

const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        modal:modalHandleReducer,
        auth:authSliceReducer
    },
    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})

export default store