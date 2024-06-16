import { apiSlice } from "./apiSlice";

const bookingSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        bookSlot:builder.mutation({
            query:(data)=>({
                url:'/booking/bookslot',
                method:'POST',
                body:data
            })
        })
    })
})

export const {useBookSlotMutation} = bookingSlice