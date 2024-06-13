import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:8000/api', credentials:'include'}),
    endpoints:(builder)=>({
        //will be injecting endpoints
    })
})