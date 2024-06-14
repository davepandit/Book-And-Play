import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        headerModal: false,
        profileModal: false
    },
    reducers:{
        openModal:(state , action)=>{
            state.headerModal = true
        },
        closeModal:(state , action)=>{
            state.headerModal = false
        },
        openProfileDropdown:(state , action)=>{
            state.profileModal = true
        },
        closeProfileDropdown:(state , action)=>{
            state.profileModal = false
        }
    }
})

export const {openModal , closeModal , openProfileDropdown , closeProfileDropdown} = modalSlice.actions
export default modalSlice.reducer