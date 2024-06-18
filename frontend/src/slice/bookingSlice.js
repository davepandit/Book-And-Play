import { apiSlice } from "./apiSlice";

const bookingSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        bookSlot:builder.mutation({
            query:(data)=>({
                url:'/booking/bookslot',
                method:'POST',
                body:data
            })
        }),
        getMyBookings:builder.query({
            query:()=>({
                url:'/booking/getmybookings',
                method:'GET'
            })
        }),
        //admin functionality 
        markasReported:builder.mutation({
            query:(data)=>({
                url:'/booking/markavailibility',
                method:'POST',
                body:data
            })
        }),
        //admin functionality 
        getallSlots:builder.query({
            query:()=>({
                url:'/booking/getallBookings',
                method:'GET'
            })
        }),
        //adminn functionality 
        markNotReported:builder.mutation({
            query:(data)=>({
                url:'/booking/marknotreported',
                method:'POST',
                body:data
            })
        })

    })
})

export const {useBookSlotMutation , useGetMyBookingsQuery , useMarkasReportedMutation , useGetallSlotsQuery , useMarkNotReportedMutation} = bookingSlice