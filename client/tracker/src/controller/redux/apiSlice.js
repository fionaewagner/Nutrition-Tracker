import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    results:[]
}

const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers:{
        fillResults:(state, action)=>{
            state.results = action.payload;
        }
    }
}
)

export const {fillResults} = apiSlice.actions

export const apiReducer = apiSlice.reducer


export const selectResults =(state)=>{
    return state.api.results
}
