import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        headerModal: false
    },
    reducers:{
        openModal:(state , action)=>{
            state.headerModal = true
        },
        closeModal:(state , action)=>{
            state.headerModal = false
        }
    }
})

export const {openModal , closeModal} = modalSlice.actions
export default modalSlice.reducer