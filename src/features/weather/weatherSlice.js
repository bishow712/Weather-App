import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import weatherService from './weatherService'

const initialState = {
    weatherInfo: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const fetchInfo = createAsyncThunk('weather/info', async (thunkAPI)=>{
    try {
        return await weatherService.fetchData()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        reset: (state) =>  initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInfo.pending, (state)=>{
                 state.isLoading = true
            })
            .addCase(fetchInfo.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError=false
                state.weatherInfo = action.payload
            })
            .addCase(fetchInfo.rejected, (state,action)=>{
                state.isLoading=false
                state.isError=true
                state.message = action.payload
            })
    }
})

export const {reset} = weatherSlice.actions

export default weatherSlice.reducer