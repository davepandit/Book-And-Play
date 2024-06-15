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
        }),
        checkAvailiblity:builder.query({
            query:({game , date})=>({
                url:'/games/checkavailibility',
                method:'GET',
                params:{
                    game,
                    date
                }
                //for this name no need to make any state rather can directly take it from  the params in the url and can use the hook useSearchParams
            })
        })
    })
})

export const {useAddSlotsMutation , useCheckAvailiblityQuery} = gameSlice