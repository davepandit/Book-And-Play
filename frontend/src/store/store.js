import { configureStore } from "@reduxjs/toolkit";
import modalHandleReducer from '../slice/modal'

const store = configureStore({
    reducer:{
        modal:modalHandleReducer
    },
    devTools:true
})

export default store