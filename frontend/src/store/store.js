import { configureStore } from "@reduxjs/toolkit";
import modalHandleReducer from '../slice/modal'
import { apiSlice } from "../slice/apiSlice";

const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        modal:modalHandleReducer
    },
    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})

export default store