import { apiSlice } from "./apiSlice";

const gameSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        addSlots:builder.mutation({
            //data here is going to be an object 
            query:(data)=>({
                url:'/games/addslot',
                method:'POST',
                body:data
            })
        })
    })
})

export const {useAddSlotsMutation} = gameSlice